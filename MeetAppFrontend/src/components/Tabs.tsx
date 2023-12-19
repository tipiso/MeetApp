import { useState } from 'react';

export type Tab = {
  key: string;
  text: string;
};

type UseTabsProps = {
  tabs: Tab[];
};

export function useTabs({ tabs }: UseTabsProps) {
  const [active, setActive] = useState(tabs[0]);

  const updateActiveTab = (tab: Tab) => {
    setActive(tab);
  };

  return { active, updateActiveTab };
}

type Props = {
  active: Tab;
  setActive: (tab: Tab) => void;
} & UseTabsProps;

export default function Tabs({ tabs, active, setActive }: Props) {
  return (
    <div role="tablist" className="tabs tabs-boxed p-0">
      {tabs.map((t) => (
        <a
          onClick={() => setActive(t)}
          role="tab"
          className={`tab h-12 ${active.key === t.key ? 'tab-active' : ''}`}
        >
          {t.text}
        </a>
      ))}
    </div>
  );
}
