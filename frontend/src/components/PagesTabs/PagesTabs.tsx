import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { pushToRoute } from '../../utils/next'
import Tabs from '../Tabs/Tabs'

export const TabsId = {
  INPUT: 'input',
  OUTPUT: 'output',
  ABOUT: 'about',
  API_INTEGRATION: 'api-integration',
}

const tabs = [
  { route: '/', id: TabsId.INPUT, name: 'Input', content: <></> },
  { route: '/output', id: TabsId.OUTPUT, name: 'Output', content: <></> },
  { route: '/about', id: TabsId.ABOUT, name: 'About', content: <></> },
  {
    route: '/api-integration',
    id: TabsId.API_INTEGRATION,
    name: 'API Integration',
    content: <></>,
  },
]
const PagesTabs = ({ initialSelectedTab, onTabChange = null }) => {
  const [selectedTabId, setSelectedTabId] = useState(initialSelectedTab)
  const router = useRouter()

  useEffect(() => {
    setSelectedTabId(initialSelectedTab)
  }, [initialSelectedTab])

  const handleTabChangeFn = tab => {
    setSelectedTabId(tab.id)
    pushToRoute(router, tab.route)
    if (onTabChange) {
      onTabChange(tab.id)
    }
  }

  return (
    <Tabs
      className="mt-2"
      tabs={tabs}
      selectedTab={selectedTabId}
      onTabChange={handleTabChangeFn}
    />
  )
}

export default PagesTabs
