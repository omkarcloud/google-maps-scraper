import { EuiTabbedContent } from '@elastic/eui'

const Tabs = ({ tabs, selectedTab, onTabChange, ...props }) => {
  return (
    <EuiTabbedContent
      {...props}
      tabs={tabs}
      selectedTab={tabs.find(tab => tab.id === selectedTab)}
      onTabClick={tab => onTabChange(tab)}
    />
  )
}

export default Tabs
