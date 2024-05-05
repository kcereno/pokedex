import { TabTypes } from '~/types/general';

type TabsProps = {
  tabs: TabTypes[];
  currentTab: TabTypes;
  textColor: string;
  updateTab: (tab: TabTypes) => void;
};

function Tabs({ tabs, currentTab, textColor, updateTab }: TabsProps) {
  return (
    <ul className="flex justify-center gap-10 text-gray-400 border-b-2 pb-4 my-6">
      {tabs.map((tab) => (
        <li key={tab}>
          <button
            className={currentTab === tab ? `font-semibold ${textColor}` : ''}
            onClick={() => {
              updateTab(tab);
            }}
          >
            {tab}
          </button>
        </li>
      ))}
    </ul>
  );
}

export default Tabs;
