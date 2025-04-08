import { Breadcrumb } from 'antd'

export const CutomerBreadcrumb = () => {
  const itmes = [{ title: 'Home' }, { title: 'List' }, { title: 'App' }]
  return <Breadcrumb items={itmes} style={{ margin: '12px 0 0 16px' }} />
}
