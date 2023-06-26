namespace API.SignalR
{
	/**TODO: It's a temporary solution which is not scalable at all. It will only work for when WebServer exists in a single instance
	 * so no support for load balancing / cloud. */
	public class PresenceTracker
	{
		private static readonly Dictionary<string, List<string>> OnlineUsers = new Dictionary<string, List<string>>();

		public Task UserConnected(string username, string connectionId)
		{
			lock (OnlineUsers)
			{
				if (OnlineUsers.ContainsKey(username))
				{
					OnlineUsers[username].Add(connectionId);
				}
				else
				{
					OnlineUsers.Add(username, new List<string> { connectionId });
				}
			}

			return Task.CompletedTask;
		}

		public Task UserDisconnected(string username, string connectionId)
		{
			lock(OnlineUsers)
			{
				if (!OnlineUsers.ContainsKey(username)) return Task.CompletedTask;

				OnlineUsers[username].Remove(connectionId);

				if (OnlineUsers[username].Count == 0)
				{
					OnlineUsers.Remove(username);
				}
			}

			return Task.CompletedTask;
		}

		public Task<string[]> GetOnlineUsers()
		{
			string[] onlineUsers;
			lock(OnlineUsers)
			{
				onlineUsers = OnlineUsers.OrderBy(k => k.Key).Select(k => k.Key).ToArray();
			}

			return Task.FromResult(onlineUsers);
		}

	}
}

