import Tabs from '../Tabs/Tabs'

export const ViewComponent = ({ view, setView, views }) => {
  // Convert sorts to the format expected by TabsComponent
  const viewTabs = [
    ...views.map(({ id, label }) => ({
      id,
      name: label,
      content: <></>, // Assuming no content is needed for the sorting tabs
    })),
  ]

  // Handler for when a tab is clicked
  const onViewChange = selectedTab => {
    setView(selectedTab.id)
  }

  return <Tabs tabs={viewTabs} selectedTab={view} onTabChange={onViewChange} />
}
