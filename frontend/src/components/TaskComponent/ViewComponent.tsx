import Tabs from '../Tabs/Tabs'

export const ViewComponent = ({ view, setView, views }) => {
  // Convert sorts to the format expected by TabsComponent
  const viewTabs = [
    ...views.map(({ id, label }) => ({
      id,
      name: label,
      content: <></>, // Assuming no content is needed for the sorting tabs
    })),
    {"id": "__all_fields__", "name": "All Fields",    content: <></>},
  ]

  // Handler for when a tab is clicked
  const onViewChange = selectedTab => {
    const view = selectedTab.id
    setView(view ===  "__all_fields__" ? null: view)
  }
  // return null
  return <Tabs tabs={viewTabs} selectedTab={ view ===  null ? "__all_fields__": view} onTabChange={onViewChange} />
}
