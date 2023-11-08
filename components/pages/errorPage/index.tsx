import { Flex, Layout } from 'antd';
import Header from '../../common/header';
import Footer from '../../common/footer';
import useStyles from "./style";

interface ErrorPageProps {
  children: React.ReactNode;
}

const ErrorPage = ({
  children,
}: ErrorPageProps) => {
  const classes = useStyles;
  const {Content} = Layout;
  return (
    <>       
      <Flex flex={1}>
        <Flex flex={1} justify='flex-start' align='flex-start' vertical>
          <Layout style={classes.layoutContainer}>
            <Header externalClasses={{
              container: classes.stickyHeader,
              header: classes.headerContainer
            }}/>
            <Content style={classes.contentContainer}>
              {children}
            </Content>
            <Footer/>
          </Layout>
        </Flex>
        <div style={classes.rightContainer}/>
      </Flex>
            
    </>
  )
};

export default ErrorPage;