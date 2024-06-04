import { GetServerSideProps } from 'next/types'
import Description from '../../components/Description/Description'
import OutputComponent from '../../components/OutputComponent/OutputComponent'
import Tabs, { TabsId } from '../../components/PagesTabs/PagesTabs'
import Seo from '../../components/Seo'
import {
  OutputContainer,
  OutputTabsContainer,
  TabWrapper,
} from '../../components/Wrappers'
import AuthedDashboard from '../../layouts/AuthedDashboard'
import Api from '../../utils/api'
import AxiosErrorHoc, { wrapAxiosErrors } from '../../components/AxiosErrorHoc'
import ServerStatusComponent from '../../components/ServerStatusComponent'

const Page = ({ tasks, ...props }: any) => {
  return (
    <>
      <Seo {...props} title={'Output'} />

      <AuthedDashboard {...props}>
      <OutputComponent {...props} tasks={tasks} />
        
      </AuthedDashboard>
    </>
  )
}
export const getServerSideProps: GetServerSideProps = wrapAxiosErrors(async ({}) => {
  const [tasks, config] = await Promise.all([Api.getTasks(), Api.getConfig()]);

  return {
    props: { ...config, tasks: tasks.data },
  }

})
export default AxiosErrorHoc(Page)
