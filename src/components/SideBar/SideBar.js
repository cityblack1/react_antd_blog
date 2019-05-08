import { PureComponent } from 'react';
import styles from './SideBar.less';
import { Input, Card, Form, Button } from 'antd';
import { objectTypeIndexer } from '@babel/types';

const Search = Input.Search;
const FormItem = Form.Item
const Text = Input.TextArea


@Form.create()
class ContactMeForm extends PureComponent {
  formItemLayout = {
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 24 },
      md: { span: 24 },
    },
  };
  render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <Form>
        <FormItem
          {...this.formItemLayout}
        >
          {getFieldDecorator("message")(
            <Text allowClear placeholder="请输入你想对我说的话" autosize={{ minRows: 2, maxRows: 6 }} />
          )}
        </FormItem>
        {/*<FormItem*/}
          {/*{...this.formItemLayout}*/}
          {/*label="邮箱"*/}
        {/*>*/}
          {/*{getFieldDecorator("email")(*/}
            {/*<Input placeholder="请填写你的邮箱"*/}
                   {/*addonAfter={(<a onClick={e => console.log(e)}>提交</a>)}*/}
            {/*/>*/}
          {/*)}*/}
        {/*</FormItem>*/}
        <FormItem
          {...this.formItemLayout}
        >
          {getFieldDecorator("email")(
            <Search
              placeholder="请输入邮箱"
              enterButton="提交"
              onSearch={value => console.log(value)}
              allowClear
            />
          )}
        </FormItem>
      </Form>
    )
  }
}

export default class SideBar extends PureComponent {
  render() {
    const {dates, categories, tags} = this.props
    return (
      <div className={styles.sidebar} role="complementary" style={{padding: 3}}>

        {/* <section className={styles.widget}>
            <Search
              placeholder="输入你感兴趣的内容"
              onSearch={value => console.log(value)}
              enterButton
            />
        </section> */}
        <Card style={{margin:0}} loading={this.props.loading}>
          <section className={styles.widget}>
            <h2 className={styles['widget-title']}>分类</h2>
            <div className="menu-sections-container">
              <ul id="menu-sections-1" className="menu">
                {categories.map((item) => (
                  <li key={item.category_id} className="menu-item menu-item-type-post_type menu-item-object-page">
                    <a href={"/articles/category/" + item.category_id}>
                      {item.name}&nbsp;&nbsp;({item.num})
                    </a>
                </li>
                ))}
              </ul>
            </div>
          </section>
        </Card>
        <Card style={{margin:0}} loading={this.props.loading}>
          <section className={styles.widget}>
            <h2 className={styles['widget-title']}>归档</h2>
            <ul>
              {dates.map((item, index) => (
                <li key={index}>
                  <a href={"/articles/date/" + item.date} className="bump-view" data-bump-view="tp">
                    {item.date}&nbsp;&nbsp;&nbsp;(&nbsp;{item.num}&nbsp;)
                  </a>
              </li>
              ))}
            </ul>
          </section>
        </Card>
        <Card style={{margin:0}} loading={this.props.loading}>
          <section className={styles.widget}>
            <h2 className={styles['widget-title']}>标签</h2>
            <ul className="xoxo blogroll">
                {tags.map((item) => (
                  <li key={item.tag_id}>
                   <a href={"/articles/tag/" + item.tag_id}>{item.name}&nbsp;&nbsp;&nbsp;(&nbsp;{item.num}&nbsp;)</a>
                 </li>
                ))}
            </ul>
          </section>
        </Card>
        {/* <section className={styles.widget}>
          <h2 className={styles['widget-title']}>联系我</h2>
          <div> */}
            {/* <ContactMeForm /> */}

            {/*<form action="/feedback/contact/" method="POST">*/}
              {/*<span />*/}
              {/*<fieldset>*/}
                {/*<legend>你的名字:</legend>*/}
                {/*<Input id="4396name" type="text" name="name" placeholder="请输入你喜欢的称呼~" />*/}
                {/*<br />(输入你喜欢的昵称吧)*/}
              {/*</fieldset>*/}
              {/*<fieldset>*/}
                {/*<legend>你的E-mail:</legend>*/}
                {/*<Input id="4396id" name="email" type="text" placeholder="eg:123456@qq.com" />*/}
                {/*<br />(请输入能联系到你的Email)*/}
              {/*</fieldset>*/}
              {/*<fieldset>*/}
                {/*<legend>你的留言</legend>*/}
                {/*<textarea*/}
                  {/*id="4396m"*/}
                  {/*name="message"*/}
                  {/*title="contact-me"*/}
                  {/*placeholder="在这里输入你的留言, 我收到后会尽快联系你"*/}
                {/*/>*/}
                {/*<br />(example:cityblack1 is a handsome guy!)*/}
              {/*</fieldset>*/}
              {/*<Input type="submit" id="submit4396" name="kpg_ksub" value="发送给Cityblack1" />*/}
            {/*</form>*/}
          {/* </div>
        </section> */}
        <section className={styles.widget} />
        <div style={{fontSize: 10, float: 'right', bottom: 0}}>冀ICP备17027160号-1</div>
      </div>
    );
  }
}
