import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';
import { addRecipeRequest, deleteRecipe, loadItems } from '../../api/fetchApi';
import { setItemsAction } from '../../store/types/craftSlice';
import { Button, Col, List, Row, Typography } from 'antd';
import { RecipeEdit } from '../RecipeEdit/RecipeEdit';
import { CloseOutlined } from '@ant-design/icons';
const { Title } = Typography;

export const ItemsList = () => {
  const dispatch = useDispatch();
  const activeCategory = useSelector(
    (state: any) => state.craft.activeCategory
  );
  const items = useSelector((state: any) => state.craft.items);
  const [activeRecipe, setActiveRecipe] = useState(null);

  const loadCategory = async () => {
    const result = await loadItems(activeCategory);
    dispatch(setItemsAction(result));
  };

  const onClick = (item: any) => {
    setActiveRecipe(item);
  };

  const addRecipe = async () => {
    const newItems = await addRecipeRequest(activeCategory);
    dispatch(setItemsAction(newItems));
  };

  useEffect(() => {
    if (activeCategory) {
      loadCategory();
    }
  }, [activeCategory]);

  const deleteRecipeHandler = async (id: string) => {
    const newItems = await deleteRecipe(id, activeCategory);
    dispatch(setItemsAction(newItems));
  };

  return (
    <div>
      <Row>
        <Col
          span={9}
          style={{ overflowX: 'scroll', maxHeight: 'calc(100vh - 20px)' }}
        >
          <Title level={2}>Рецепты</Title>
          <Button
            type="primary"
            style={{ marginBottom: '10px' }}
            onClick={addRecipe}
          >
            Добавить рецепт
          </Button>
          <List
            bordered
            dataSource={items[activeCategory] || []}
            renderItem={(item: any) => (
              <List.Item
                style={{ cursor: 'pointer' }}
                onClick={() => {
                  onClick(item);
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    width: '100%',
                  }}
                >
                  {item.RecipeName}
                  <Button
                    onClick={() => {
                      deleteRecipeHandler(item.id);
                    }}
                  >
                    <CloseOutlined />
                  </Button>
                </div>
              </List.Item>
            )}
          />
        </Col>
        <Col span={15}>
          {activeRecipe !== null && (
            <RecipeEdit recipe={activeRecipe} activeCategory={activeCategory} />
          )}
        </Col>
      </Row>
    </div>
  );
};
