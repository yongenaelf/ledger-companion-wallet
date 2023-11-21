import { Flex, Layout } from 'antd';
import Header from '@/components/common/header';
import Footer from '@/components/common/footer';
import styles from "./style.module.css";

interface ErrorPageProps {
  children: React.ReactNode;
}

const ErrorPage = ({
  children,
}: ErrorPageProps) => {
  const {Content} = Layout;
  return (
    <>       
      <Flex flex={1}>
        <Flex flex={1} justify='flex-start' align='flex-start' vertical>
          <Layout className={styles.layoutContainer}>
            <Header externalClasses={{
              container: styles.stickyHeader,
              header: styles.headerContainer
            }}/>
            <Content className={styles.contentContainer}>
              {children}
            </Content>
            <Footer/>
          </Layout>
        </Flex>
        <div className={styles.rightContainer}/>
      </Flex>
            
    </>
  )
};

export default ErrorPage;