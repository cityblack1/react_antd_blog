import React, { PureComponent } from 'react';
import styles from './index.less';

export default class BasicHeader extends PureComponent {
  render() {
    return (
      <div className={styles.BasicHeader}>
        <div className={styles['site-header-main']}>
          <div className={styles['site-branding']}>
            <h1 className={styles['site-title']}>
              <a href="/" rel="home">
                褐色城市
              </a>
            </h1>
            <p className={styles['site-description']}>The website of Cityblack1</p>
          </div>
          <div className={styles['site-header-menu']}>
            <nav className={styles['main-navigation']} role="navigation" aria-label="Primary Menu">
              <div>
                <ul className={styles['primary-menu']}>
                  {/* <li className={styles['menu-li']}>
                    <a href="/about/">关于我</a>
                  </li>
                  <li className={styles['menu-li']}>
                    <a href="#" className="md-trigger" data-modal="modal-101">
                      晕猫
                    </a>
                  </li> */}
                  <li className={styles['menu-li']}>
                    <a href="https://github.com/cityblack1" target="_black">
                      Github
                    </a>
                  </li>
                  {/* <li className={styles['menu-li']}>
                    <a href="https://github.com/cityblack1" target="_black">
                      我的作品
                    </a>
                  </li> */}
                </ul>
              </div>
            </nav>
          </div>
        </div>
        <div className={styles['header-image']}>
          <a href="/" rel="home">
            <img alt="褐色城市" src="http://wx2.sinaimg.cn/large/6b40c36cly1g2492dj1fzj20xc07sh25.jpg" />
          </a>
        </div>
        <div id="pageHead" />
      </div>
    );
  }
}
