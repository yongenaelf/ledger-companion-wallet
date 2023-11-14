import { Flex, Layout } from 'antd';
import Header from '../../common/header';
import Footer from '../../common/footer';
import styles from "./style";

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
          <Layout style={styles.layoutContainer}>
            <Header externalClasses={{
              container: styles.stickyHeader,
              header: styles.headerContainer
            }}/>
            <Content style={styles.contentContainer}>
              {children}
            </Content>
            <Footer/>
          </Layout>
        </Flex>
        <div style={styles.rightContainer}/>
      </Flex>
            
    </>
  )
};

export default ErrorPage;