import React, { useEffect } from 'react';
import { Button, Card, Typography } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import { useFormik } from 'formik';
import { saveRecipe } from '../../api/fetchApi';
import { useDispatch } from 'react-redux';
import { setItemsAction } from '../../store/types/craftSlice';
const { Title } = Typography;

type CraftComponentType = {
  Classname: string;
  Amount: number;
  Destroy: number;
  Changehealth: number;
};

export const RecipeEdit = ({
  recipe,
  activeCategory,
}: {
  recipe: any;
  activeCategory: string;
}) => {
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: recipe,
    onSubmit: async (values) => {
      const result = await saveRecipe(values, activeCategory);
      dispatch(setItemsAction(result));
    },
  });

  const onRemoveComponent = (index: number) => {
    const newComponents = formik.values.CraftComponents.filter(
      (_: any, i: any) => i !== index
    );
    formik.setFieldValue('CraftComponents', newComponents);
  };

  const onAddComponent = () => {
    const newComponents = [
      ...formik.values.CraftComponents,
      {
        Classname: '',
        Amount: 0,
        Destroy: 0,
        Changehealth: 0,
      },
    ];
    formik.setFieldValue('CraftComponents', newComponents);
  };

  const onAddAttachment = () => {
    const newAttachments = [...formik.values.AttachmentsNeed, ''];
    formik.setFieldValue('AttachmentsNeed', newAttachments);
  };

  const onRemoveAttachment = (index: number) => {
    const newAttachments = formik.values.AttachmentsNeed.filter(
      (_: any, i: any) => i !== index
    );
    formik.setFieldValue('AttachmentsNeed', newAttachments);
  };

  useEffect(() => {
    formik.setValues(recipe);
  }, [recipe]);

  return (
    <div
      style={{
        marginLeft: '10px',
        overflowX: 'scroll',
        maxHeight: 'calc(100vh - 20px)',
      }}
    >
      <Title level={2}>{recipe.RecipeName}</Title>
      <form onSubmit={formik.handleSubmit}>
        <div style={{ marginBottom: '10px' }}>
          <label
            style={{
              marginRight: '10px',
              fontSize: '18px',
              minWidth: '160px',
              display: 'inline-block',
            }}
          >
            Результат
          </label>
          <input
            name="Result"
            style={{
              borderRadius: '5px',
              height: '30px',
              padding: '5px',
              border: '1px solid grey',
            }}
            onChange={formik.handleChange}
            value={formik.values.Result}
          />
        </div>

        <div style={{ marginBottom: '10px' }}>
          <label
            style={{
              marginRight: '10px',
              fontSize: '18px',
              minWidth: '160px',
              display: 'inline-block',
            }}
          >
            Количество
          </label>
          <input
            name="ResultCount"
            type="number"
            style={{
              borderRadius: '5px',
              height: '30px',
              padding: '5px',
              border: '1px solid grey',
            }}
            onChange={formik.handleChange}
            value={formik.values.ResultCount}
          />
        </div>

        <div style={{ marginBottom: '10px' }}>
          <label
            style={{
              marginRight: '10px',
              fontSize: '18px',
              minWidth: '160px',
              display: 'inline-block',
            }}
          >
            Имя рецепта
          </label>
          <input
            name="RecipeName"
            style={{
              borderRadius: '5px',
              height: '30px',
              padding: '5px',
              border: '1px solid grey',
            }}
            onChange={formik.handleChange}
            value={formik.values.RecipeName}
          />
        </div>

        <div style={{ marginBottom: '10px' }}>
          <label
            style={{
              marginRight: '10px',
              fontSize: '18px',
              minWidth: '160px',
              display: 'inline-block',
            }}
          >
            Тип крафта
          </label>
          <input
            name="CraftType"
            style={{
              borderRadius: '5px',
              height: '30px',
              padding: '5px',
              border: '1px solid grey',
            }}
            onChange={formik.handleChange}
            value={formik.values.CraftType}
          />
        </div>

        <div style={{ marginBottom: '10px' }}>
          <label
            style={{
              marginRight: '10px',
              fontSize: '18px',
              minWidth: '160px',
              display: 'inline-block',
            }}
          >
            Всегда оставлять 1
          </label>
          <input
            name="ComponentsDontAffectHealth"
            type="number"
            style={{
              borderRadius: '5px',
              height: '30px',
              padding: '5px',
              border: '1px solid grey',
            }}
            onChange={formik.handleChange}
            value={formik.values.ComponentsDontAffectHealth}
          />
        </div>

        <div style={{ marginBottom: '10px', marginTop: '20px' }}>
          <label
            style={{
              marginRight: '10px',
              fontSize: '18px',
              minWidth: '160px',
              display: 'inline-block',
              fontWeight: 'bold',
            }}
          >
            Инструменты
          </label>
          {formik.values.AttachmentsNeed.map(
            (attachment: string, index: number) => (
              <Card
                key={index}
                style={{
                  marginBottom: '10px',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <input
                  name={`AttachmentsNeed.${index}`}
                  style={{
                    borderRadius: '5px',
                    height: '32px',
                    padding: '5px',
                    border: '1px solid grey',
                    marginRight: '10px',
                  }}
                  onChange={formik.handleChange}
                  value={formik.values.AttachmentsNeed[index]}
                />
                <Button onClick={() => onRemoveAttachment(index)}>
                  <CloseOutlined />
                </Button>
              </Card>
            )
          )}
          <Button onClick={() => onAddAttachment()}>Добавить инструмент</Button>
        </div>

        <div style={{ marginBottom: '10px', marginTop: '20px' }}>
          <label
            style={{
              marginRight: '10px',
              fontSize: '18px',
              minWidth: '160px',
              display: 'inline-block',
              fontWeight: 'bold',
            }}
          >
            Компоненты
          </label>
          <div>
            {formik.values.CraftComponents.map(
              (craftComponent: CraftComponentType, index: number) => (
                <Card key={index} style={{ marginBottom: '10px' }}>
                  <div style={{ marginBottom: '10px' }}>
                    <label
                      style={{
                        marginRight: '10px',
                        fontSize: '18px',
                        minWidth: '250px',
                        display: 'inline-block',
                      }}
                    >
                      Имя класса
                    </label>
                    <input
                      name={`CraftComponents.${index}.Classname`}
                      style={{
                        borderRadius: '5px',
                        height: '30px',
                        padding: '5px',
                        border: '1px solid grey',
                      }}
                      onChange={formik.handleChange}
                      value={formik.values.CraftComponents[index].Classname}
                    />
                  </div>
                  <div style={{ marginBottom: '10px' }}>
                    <label
                      style={{
                        marginRight: '10px',
                        fontSize: '18px',
                        minWidth: '250px',
                        display: 'inline-block',
                      }}
                    >
                      Количество
                    </label>
                    <input
                      name={`CraftComponents.${index}.Amount`}
                      type="number"
                      style={{
                        borderRadius: '5px',
                        height: '30px',
                        padding: '5px',
                        border: '1px solid grey',
                      }}
                      onChange={formik.handleChange}
                      value={formik.values.CraftComponents[index].Amount}
                    />
                  </div>
                  <div style={{ marginBottom: '10px' }}>
                    <label
                      style={{
                        marginRight: '10px',
                        fontSize: '18px',
                        minWidth: '250px',
                        display: 'inline-block',
                      }}
                    >
                      Уничтожить
                    </label>
                    <input
                      name={`CraftComponents.${index}.Destroy`}
                      type="number"
                      style={{
                        borderRadius: '5px',
                        height: '30px',
                        padding: '5px',
                        border: '1px solid grey',
                      }}
                      onChange={formik.handleChange}
                      value={formik.values.CraftComponents[index].Destroy}
                    />
                  </div>
                  <div style={{ marginBottom: '10px' }}>
                    <label
                      style={{
                        marginRight: '10px',
                        fontSize: '18px',
                        minWidth: '250px',
                        display: 'inline-block',
                      }}
                    >
                      Изменить здоровье предмета
                    </label>
                    <input
                      name={`CraftComponents.${index}.Changehealth`}
                      type="number"
                      style={{
                        borderRadius: '5px',
                        height: '30px',
                        padding: '5px',
                        border: '1px solid grey',
                      }}
                      onChange={formik.handleChange}
                      value={formik.values.CraftComponents[index].Changehealth}
                    />
                  </div>
                  <Button onClick={() => onRemoveComponent(index)}>
                    Удалить
                  </Button>
                </Card>
              )
            )}
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Button onClick={() => onAddComponent()}>
                Добавить компонент
              </Button>
              <Button type="primary" htmlType="submit">
                Cохранить
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
