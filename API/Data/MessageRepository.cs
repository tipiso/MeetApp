using API.DTOs;
using API.Entities;
using API.Helpers;
using API.Interfaces;
using System.Linq;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class MessageRepository : IMessageRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;

        public MessageRepository(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public void AddGroup(Group group)
        {
            _context.Groups.Add(group);
        }

        public void AddMessage(Message message)
        {
            _context.Messages.Add(message);
        }

        public void DeleteMessage(Message message)
        {
            _context.Messages.Remove(message);
        }

        public async Task<Connection> GetConnection(string connectionId)
        {
            return await _context.Connections.FindAsync(connectionId);
        }

        public async Task<IEnumerable<MessageDto>> GetConversationsForUser(string username)
        {
            var latestMessages = _context.Messages
                    .Include(m => m.Recipient)
                    .ThenInclude(m => m.Photos)
                    .Include(m => m.Sender)
                    .ThenInclude(u => u.Photos)
                    .Where(m => m.SenderUsername == username || m.RecipientUsername == username)
                    .ToList()
                    .GroupBy(m => new { ConversationId = Math.Min(m.SenderId, m.RecipientId), OtherUserId = Math.Max(m.SenderId, m.RecipientId) })
                    .Select(g => g.OrderByDescending(m => m.MessageSent).FirstOrDefault())
                    .OrderByDescending(m => m.MessageSent)
                    .AsQueryable();

            return latestMessages.ProjectTo<MessageDto>(_mapper.ConfigurationProvider).ToList();
        }

        public async Task<Group> GetGroupForConnection(string connectionId)
        {
            return await _context.Groups.Include(x => x.Connections)
                .Where(x => x.Connections.Any(c => c.ConnectionId == connectionId))
                .FirstOrDefaultAsync();
        }

        public async Task<Message> GetMessage(int id)
        {
            return await _context.Messages.FindAsync(id);
        }

        public async Task<Group> GetMessageGroup(string groupName)
        {
            return await _context.Groups
                .Include(x => x.Connections)
                .FirstOrDefaultAsync(x => x.Name == groupName);
        }

        public async Task<PagedList<MessageDto>> GetMessagesForUser(MessageParams messageParams)
        {
            var query = _context.Messages
                .OrderByDescending(m => m.MessageSent)
                .AsQueryable();


            query = messageParams.Container switch
            {
                "Inbox" => query.Where(u => u.RecipientUsername == messageParams.Username
                    && u.RecipientDelete == false),
                "Outbox" => query.Where(u => u.SenderUsername == messageParams.Username
                    && u.SenderDeleted == false),
                _ => query.Where(u => u.RecipientUsername == messageParams.Username && u.DateRead == null
                    && u.RecipientDelete == false)
            };

            var messages = query.ProjectTo<MessageDto>(_mapper.ConfigurationProvider);

            return await PagedList<MessageDto>.CreateAsync(
              messages,
              messageParams.PageNumber,
              messageParams.PageSize
              );
        }

        public async Task<IEnumerable<MessageDto>> GetMessageThread(string currentUsername, string recipientUsername)
        {
            var query = _context.Messages
                .Where(
                    m => m.RecipientUsername == currentUsername && m.RecipientDelete == false &&
                    m.SenderUsername == recipientUsername ||
                    m.RecipientUsername == recipientUsername && m.SenderDeleted == false &&
                    m.SenderUsername == currentUsername
                )
                .OrderBy(m => m.MessageSent)
                .AsQueryable();

            var unreadMessages = query.Where(m => m.DateRead == null
                && m.RecipientUsername == currentUsername)
                .ToList();

            if (unreadMessages.Any())
            {
                foreach (var message in unreadMessages)
                {
                    message.DateRead = DateTime.UtcNow;
                }
            }

            return await query.ProjectTo<MessageDto>(_mapper.ConfigurationProvider).ToListAsync();
        }

        public void RemoveConnection(Connection connection)
        {
            _context.Connections.Remove(connection);
        }
    }
}

