import dynamic from 'next/dynamic'

const DynamicComponentWithNoSSR = dynamic(() => import('../components/test'), {
  ssr: false
})

export default () => <DynamicComponentWithNoSSR />