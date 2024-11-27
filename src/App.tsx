import React, { useEffect, useState } from 'react';
import {Button, Layout, Menu} from 'antd';
import type { MenuProps } from 'antd';
import { loadCategories } from './api/fetchApi';
import { useDispatch } from 'react-redux';
import {
  setActiveCategoryAction,
  setCategoriesAction,
} from './store/types/craftSlice';
import { ItemsList } from './components/itemsList/ItemsList';

const { Content, Sider } = Layout;

const App = () => {
  const [current, setCurrent] = useState('mail');
  const [menuItems, setMenuItems] = useState([]);
  const dispatch = useDispatch();

  const getCategories = async () => {
    const data = await loadCategories();

    if (data.error) {
      dispatch(setCategoriesAction(null));
    } else {
      dispatch(setCategoriesAction(data));
      const items = data.map((item: any) => {
        return {
          label: item.name,
          key: item.id,
          icon: null,
        };
      });
      setMenuItems(items);
    }
  };

  const onClick: MenuProps['onClick'] = (e) => {
    setCurrent(e.key);
    dispatch(setActiveCategoryAction(e.key));
  };

  const addCategory = () => {

  }

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <Layout>
      <Sider width="25%" breakpoint="lg" collapsedWidth="0">
        <div className="demo-logo-vertical" />
        <Menu
          onClick={onClick}
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['4']}
          items={menuItems}
        />
        <Button type="primary" onClick={addCategory}>
            Добавить
        </Button>
      </Sider>
      <Layout>
        <Content
          style={{
            height: 'calc(100vh - 16px)',
            paddingLeft: '50px',
          }}
        >
          <ItemsList />
        </Content>
      </Layout>
    </Layout>
  );
};

export default App;
