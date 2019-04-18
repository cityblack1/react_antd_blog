import ArticleLayout from './Layout'
import { connect } from 'dva';
import { PureComponent } from 'react';
import DocumentTitle from 'react-document-title';
import styles from './index.less';
import { Card, Pagination, Button, Icon, Form, Input, Row, Col, List, Avatar, Divider } from 'antd';
import FooterToolbar from '../../components/FooterToolbar'


const FormItem = Form.Item
const InputGroup = Input.Group;
const footerStyle = { borderRadius: 10, width: '60%', left: 100, bottom: 30 }

@Form.create()
@connect(state => (state.article))
class Comments extends PureComponent {
  comment = (e) => {
    if (e) e.preventDefault()
    const { validateFieldsAndScroll, resetFields } = this.props.form;
    return validateFieldsAndScroll(async (error, fieldsValue) => {
      if (!error) {
        await resetFields()
        await this.props.dispatch({
          type: 'article/comment',
          payload: {
            ...fieldsValue,
            article_id: this.props.article.id,
            parent_id: 0,
          },
          article: this.props.article
        })
      }
    })
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form style={{ marginTop: 7 }} onSubmit={this.comment}>
        <Row>
          <Col span={3}>
            <FormItem>
              {getFieldDecorator("author_name", {
                rules: [{ required: true, message: '不能为空' }]
              })(
                <Input placeholder="昵称" />
              )}
            </FormItem>
          </Col>
          <Col offset={1} span={13}>
            <FormItem>
              {getFieldDecorator("content", {
                rules: [{ required: true, message: '不能为空' }]
              })(
                <Input placeholder="请输入对文章的评论" />
              )}
            </FormItem>
          </Col>
          <Col offset={1} span={2}>
            <FormItem>
              <Button icon="message" type="primary" htmlType="submit">评论</Button>
            </FormItem>
          </Col>
          <Col offset={1} span={2}>
            <FormItem>
              <Button icon="shrink" onClick={this.props.fold}>收起</Button>
            </FormItem>
          </Col>
        </Row>
      </Form>
    )
  }
}

@Form.create()
@connect(state => (state.article))
class Comment extends PureComponent {
  state = { want: false }

  submit = (e) => {
    if (e) e.preventDefault()
    console.log('asd')
    const { validateFieldsAndScroll, resetFields } = this.props.form;
    return validateFieldsAndScroll(async (error, fieldsValue) => {
      if (!error) {
        await resetFields()
        await this.props.dispatch({
          type: 'article/comment',
          payload: {
            ...fieldsValue,
            article_id: this.props.comment.article_id,
            parent_id: this.props.comment.id,
          },
          article: this.props.article
        })
        await this.setState({ want: false})
      }
    })
  }

  getInput = () => {
    const { getFieldDecorator } = this.props.form;

    return (
      <Form onSubmit={this.submit} >
        <Row>
          <Col span={3}>
            <FormItem style={{marginBottom: 0, marginTop: 0}}>
              {getFieldDecorator("author_name", {
                rules: [{ required: true, message: '不能为空' }]
              })(
                <Input placeholder="昵称" />
              )}
            </FormItem>
          </Col>
          <Col offset={1} span={13}>
            <FormItem style={{marginBottom: 0, marginTop: 0}}>
              {getFieldDecorator("content", {
                rules: [{ required: true, message: '不能为空' }]
              })(
                <Input placeholder="请输入对文章的评论" />
              )}
            </FormItem>
          </Col>
          <Col offset={1} span={2}>
            <FormItem style={{marginBottom: 0, marginTop: 0}}>
              <Button icon="message" type="primary" htmlType="submit">评论</Button>
            </FormItem>
          </Col>
        </Row>
      </Form>
    )
  }

  comment = (e) => {
    if (e) e.preventDefault()
    this.setState({ want: true })
  }

  getDefault = () => {
    return (
      <a style={{color: '#40a9ff'}} onClick={(e) => this.comment(e)}>评论</a>
    )
  }

  render() {

    return (
      this.state.want ? this.getInput() : this.getDefault()
    )
  }
}

class CommentsList extends PureComponent {
  getContent = (item) => {
    return (
      <div>
        {item.content}
        <div style={{marginTop: 20, height: 40}} >
          <Comment comment={item} article={this.props.article} />
        </div>
      </div>
    )
  }
  render() {
    const { comments } = this.props
    return (
      <div style={this.props.parent ? {marginBottom: 100} : {}}>
        {this.props.parent ? <Divider dashed>评论</Divider> : ''}
        {comments && comments.length > 0 ? <List
          itemLayout="horizontal"
          dataSource={comments}
          style={{ marginTop: 10, marginBottom: 30, marginLeft: 50 }}
          renderItem={item => (
            <div>

              {/* <List.Item extra={<Comment comment={item} />}> */}
              <List.Item>
                <List.Item.Meta
                  avatar={<Avatar src="https://b-ssl.duitang.com/uploads/item/201407/25/20140725114914_xUZvw.thumb.700_0.jpeg">{item.author_name}</Avatar>}
                  title={item.author_name}
                  description={this.getContent(item)}
                />
                <div>
                </div>
                {/* <Comment comment={item} /> */}

              </List.Item>

              <CommentsList comments={item.comments} />
            </div>
          )}
        /> : comments && comments.length === 0 && this.props.parent ? '暂无评论' : ''}
      </div>

    )
  }
}

@connect(state => (state.article))
export default class Articles extends PureComponent {
  getPathParams = () => {
    return this.props.match.params
  }

  async componentWillMount() {
    const {part, id} = this.getPathParams()
    const { dispatch } = this.props;
    if (!part) {
      await dispatch({
        type: 'article/fetch',
      });
    } else {
      await dispatch({
        type: 'article/fetchPart',
        payload: {part, id}
      });
    }
  }
  state = { open: -1, current: 1, pageSize: 5, loading: false }

  openContent = async (e, article_id, close) => {
    if (e) e.preventDefault()
    if (close) {
      await this.setState({ open: -1 })
    } else {
      await this.setState({ open: article_id })
    }
    const anchorName = 'article_' + article_id
    let anchorElement = document.getElementById(anchorName);
    if (anchorElement) {
      await anchorElement.scrollIntoView();
    }
  }
  getFoot = (article) => {
    return <Comments fold={(e) => this.openContent(e, this.state.open, true)} article={article} />
  }
  getLeftData = (article) => {
    return (<footer className={styles['entry-footer']}>
      <span className={styles['posted-on']}>
        作者：<a onClick={(e) => this.openContent(e, article.id)}>
          {article.author}
        </a>
      </span>
      {/* <span className={styles['posted-on']}>
        阅读：<span className="screen-reader-text" />
        <a>{article.read_times}</a>
      </span> */}
      <span className={styles['posted-on']}>
        <span className="screen-reader-text" />分类：<a href={"/articles/category/" + article.category_id}>
          {article.category}
        </a>
      </span>
      <span className={styles['posted-on']}>
        <span className="screen-reader-text" />日期：{article.created}
      </span>
      <span className={styles['posted-on']}>
        <a onClick={(e) => this.openContent(e, article.id)}>
          评论({article.comment})<span className="screen-reader-text" />
        </a>
      </span>
    </footer>)
  }

  getArticleList = () => {
    const { articles } = this.props
    const { current, pageSize } = this.state
    return (
      articles.slice((current - 1) * pageSize, (current - 1) * pageSize + pageSize).map((article) => {
        const isOpen = this.state.open == article.id
        const opening = this.state.open > -1
        if (opening && !isOpen) return ''
        return (
          <div >
            <div key={article.key} id={'article_' + article.id} style={{ color: '#f2f2f2' }}>1 </div>
            <div className={styles['site-article']}>
              <div className={styles['entry-header']}>
                <h2 className={styles['entry-title']} >
                  <a onClick={(e) => this.openContent(e, article.id)}>{article.title}</a>
                </h2>
              </div>
              <div>
                <div className={styles['entry-content']} style={isOpen ? { width: '90%' } : {}}>
                <span dangerouslySetInnerHTML={{ __html: isOpen ? article.content : article.content_short }} />
                  {!isOpen ? <Button onClick={(e) => this.openContent(e, article.id)} className={styles['btn-3']} ghost type="primary" style={{ marginLeft: 10, padding: '0px 11px 0px 11px' }}>
                    <span style={{ color: '#007acc' }}>展开全文</span>
                    <Icon style={{ color: '#007acc', marginLeft: 1 }} type="arrow-down" />
                  </Button> : <FooterToolbar style={footerStyle} children={this.getFoot(article)} />}
                </div>
                {!isOpen ? this.getLeftData(article) : ''}
              </div>
            </div>

            <br />
            {isOpen ? <CommentsList style={{marginBottom: 100}} parent={true} comments={article.comments} article={article} /> : ''}
            {!isOpen ? <hr /> : ''}
          </div>
        )
      })
    )
  }

  showMultiCards = () => {
    const cards = [];
    const { loading } = this.props;
    const { pageSize } = this.props;
    for (let i = 0; i < pageSize && loading; i += 1) {
      cards.push(
        <div><br /><br /><br /><br /><br /><Card loading={loading} /></div>
      )
    }
    return cards
  };
  onShowSizeChange = async (current, pageSize) => {
    this.setState({ current, pageSize })
  };
  getChildren = () => {
    const opening = this.state.open > -1
    return (
      <div>
        <Card loading={this.props.loading}>
          {this.getBread()}
          <div className={styles['site-main']} style={{ marginBottom: 10 }}>
            {this.getArticleList()}
            {opening && this.props.articles ? '' : <Pagination
              showSizeChanger
              pageSize={this.state.pageSize}
              pageSizeOptions={['5', '10', '15', '20']}
              onShowSizeChange={this.onShowSizeChange}
              current={this.state.current}
              total={this.props.articles.length}
              showTotal={(total, range) => {
                return (
                  <div style={{ float: "right" }}>
                    共<span style={{ color: "#007acc" }}>{total}</span>条，
                  当前第<span style={{ color: "#007acc" }}>{range[0]}-{range[1]}</span>条
                </div>)
              }}
            />}
          </div>
        </Card>
        {this.showMultiCards()}
      </div>
    )
  }

  getTitle = () => {
    let name, pre
    const {part, id} = this.getPathParams()
    if (!part) return '文章列表'
    else if (part === 'category') {
      pre = '分类'
      this.props.categories.forEach(item => {
        if (item.category_id == id) 
        name = item.name
      });
    } else if (part === 'tag') {
      pre = '标签'
      this.props.tags.forEach(item => {
        if (item.tag_id == id) 
        name = item.name
      });
    } else if (part === 'date') {
      pre = '归档'
      name = id
    }
    return `${pre} : ${name}`
  }

  getBread = () => {
    let name, pre, path
    const {part, id} = this.getPathParams()
    if (!part) return ''
    else if (part === 'category') {
      pre = '分类'
      this.props.categories.forEach(item => {
        if (item.category_id == id) 
        name = item.name
      });
    } else if (part === 'tag') {
      pre = '标签'
      this.props.tags.forEach(item => {
        if (item.tag_id == id) 
        name = item.name
      });
    } else if (part === 'date') {
      pre = '归档'
      name = id
    }
    return (
      <div> 当前位置： &nbsp;   
      <a href="/" >&nbsp;首页&nbsp; </a> &nbsp;&nbsp;/&nbsp;&nbsp;
      <a href={`/articles/${part}/${id}`} style={{color: 'grey'}} >&nbsp;{pre} : {name}&nbsp; </a> 
    </div>
    )
  }

  render() {
    return (
      <DocumentTitle title={`${this.getTitle()} - 隔热城市`}>
        <ArticleLayout children={this.getChildren()} />
      </DocumentTitle>
    )
  }
}