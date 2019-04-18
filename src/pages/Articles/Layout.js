import BlackBlock from '../../components/BlackBlock'
import BasicHeader from '../../components/BasicHeader'
import MenuDropDown from '../../components/MenuDropDown'
import SideBar from '../../components/SideBar/SideBar'
import GridContent from '@/components/PageHeaderWrapper/GridContent';
import { connect } from 'dva';
import { PureComponent } from 'react';
import styles from './index.less';
import { Layout } from 'antd';

@connect(state => (state.article))
export default class ArticleLayout extends PureComponent {
    render() {
        return (
            <GridContent>
                <BlackBlock>
                    <Layout className={styles.narrowLayout}>
                        <div className={styles['site-inner']}>
                            <BasicHeader />
                            <div className={styles.standardList}>
                                {/* <MenuDropDown /> */}
                                <div className={styles['site-content']}>
                                    <div className={styles['content-area']}>
                                        {this.props.children}
                                    </div>
                                    <SideBar 
                                        loading={this.props.loading}
                                        tags={this.props.tags} 
                                        categories={this.props.categories} 
                                        dates={this.props.dates}
                                    />
                                </div>
                            </div>
                        </div>
                    </Layout>
                </BlackBlock>
            </GridContent>
        )
    }
}