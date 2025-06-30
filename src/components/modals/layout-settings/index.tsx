import { useEffect, useState, type ReactNode } from 'react';
import Modal, {
  ModalBody,
  ModalContainer,
  ModalFooter,
  ModalHeader,
} from '../../modal';
import Button from '../../button';
import Radio, { type IRadioOption } from '../../radio';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal, setLayout } from '../../../store/slices/app';
import Grid from '../../grid';
import InputText from '../../input-text';
import { DEFAULT_MESH_TYPES } from '../../../constants/default';
import type { ILayoutSettings, IRootState } from '../../../interfaces/store';
import { FormContainer, FormTitleContainer } from './styles';
import { cloneDeep } from 'lodash';
import InputColor from '../../input-color';

interface IError {
  horizontal: string;
  vertical: string;
  width: string;
  height: string;
}

const MeshSettings = (): ReactNode => {
  const dispatch = useDispatch();
  const layoutStore = useSelector<IRootState, ILayoutSettings>(
    (state) => state.app.layout,
  );
  const radioOptions: IRadioOption[] = [
    {
      text: 'Обычная',
      value: DEFAULT_MESH_TYPES[0],
    },
    {
      text: 'Изометрическая',
      value: DEFAULT_MESH_TYPES[1],
    },
  ];

  const [layout, setCurrentLayout] = useState<ILayoutSettings>(layoutStore);
  const [errors, setErrors] = useState<Partial<IError>>({});

  useEffect(() => {
    checkErrors();
  }, [layout]);

  const checkErrors = () => {
    const e: Partial<IError> = {};

    if (!layout.width) {
      e.width = 'Значение ширины поля не может быть пустым';
    } else delete e.width;

    if (!layout.height) {
      e.width = 'Значение ширины поля не может быть пустым';
    } else delete e.height;

    if (!layout.horizontal) {
      e.horizontal = 'Необходимо указать ширину ячейки сетки';
    } else if (layout.horizontal >= layout.width) {
      e.horizontal = 'Ширина ячейки не может быть больше или равна ширине поля';
    } else delete e.horizontal;

    if (!layout.vertical) {
      e.vertical = 'Необходимо указать ширину ячейки сетки';
    } else if (layout.vertical >= layout.height) {
      e.vertical = 'Высота ячейки не может быть больше или ровна высоте поля';
    } else delete e.vertical;

    setErrors(e);
  };

  const handleChangeMesh = (
    field: keyof ILayoutSettings,
    value: string,
  ): void => {
    if (['horizontal', 'vertical', 'width', 'height'].includes(field)) {
    }

    const val: string | number = [
      'horizontal',
      'vertical',
      'width',
      'height',
    ].includes(field)
      ? parseInt(value.trim())
      : value.trim();
    setCurrentLayout({ ...layout, [field]: val });
  };

  const handleSaveLayout = () => {
    if (Object.values(errors).length) return;

    const data: ILayoutSettings = cloneDeep(layout);
    data.vertical = data.type === 'isometric' ? data.vertical : data.horizontal;

    dispatch(setLayout(data));
    dispatch(closeModal());
  };

  return (
    <Modal>
      <ModalContainer>
        <ModalHeader>Настройка поля</ModalHeader>
        <ModalBody>
          <Grid $rowsGap="12px">
            <Radio
              label="Тип сетки:"
              value={layout.type.toString()}
              options={radioOptions}
              onChange={(value: string) => handleChangeMesh('type', value)}
            />
            <FormContainer>
              <FormTitleContainer>Настройки ячеек сетки:</FormTitleContainer>
              <Grid $columns={2} $columnsGap="12px">
                <InputText
                  onlyNumber
                  label={
                    layout.type === 'isometric'
                      ? 'Длина ячейки'
                      : 'Длина и высота ячейки'
                  }
                  value={layout.horizontal.toString()}
                  error={errors.horizontal || ''}
                  onChange={(value: string) =>
                    handleChangeMesh('horizontal', value)
                  }
                />
                {layout.type === 'isometric' ? (
                  <InputText
                    onlyNumber
                    label="Высота ячейки"
                    value={layout.vertical.toString()}
                    error={errors.vertical || ''}
                    onChange={(value: string) =>
                      handleChangeMesh('vertical', value)
                    }
                  />
                ) : null}
              </Grid>
            </FormContainer>
            <FormContainer>
              <FormTitleContainer>
                Настройки толщины линий и шрифта
              </FormTitleContainer>
              <Grid $columns={3} $columnsGap="12px">
                <InputText
                  onlyNumber
                  label="Толщина линии сетки (px)"
                  value={layout.meshWidth.toString()}
                  onChange={(value: string) =>
                    handleChangeMesh('meshWidth', value)
                  }
                />
                <InputText
                  onlyNumber
                  label="Толщина линии осей (px)"
                  value={layout.osWidth.toString()}
                  onChange={(value: string) =>
                    handleChangeMesh('osWidth', value)
                  }
                />
                <InputText
                  onlyNumber
                  label="Размер шрифта кор-нат (px)"
                  value={layout.textSize.toString()}
                  onChange={(value: string) =>
                    handleChangeMesh('textSize', value)
                  }
                />
              </Grid>
            </FormContainer>
            <FormContainer>
              <FormTitleContainer>Настройка цвета сетки:</FormTitleContainer>
              <Grid $columns={3} $columnsGap="12px">
                <InputColor
                  label="Цвет сетки"
                  value={layout.meshColor}
                  onChange={(value: string) =>
                    handleChangeMesh('meshColor', value)
                  }
                />
                <InputColor
                  label="Цвет осей"
                  value={layout.osColor}
                  onChange={(value: string) =>
                    handleChangeMesh('osColor', value)
                  }
                />
                <InputColor
                  label="Цвет координат"
                  value={layout.textColor}
                  onChange={(value: string) =>
                    handleChangeMesh('textColor', value)
                  }
                />
              </Grid>
            </FormContainer>
            <FormContainer>
              <FormTitleContainer>Настройки рабочего поля:</FormTitleContainer>
              <Grid $columns={2} $columnsGap="12px">
                <InputText
                  onlyNumber
                  label="Длина поля (px)"
                  error={errors.width || ''}
                  value={layout.width.toString()}
                  onChange={(value: string) => handleChangeMesh('width', value)}
                />
                <InputText
                  onlyNumber
                  label="Высота поля (px)"
                  error={errors.height || ''}
                  value={layout.height.toString()}
                  onChange={(value: string) =>
                    handleChangeMesh('height', value)
                  }
                />
              </Grid>
            </FormContainer>
          </Grid>
        </ModalBody>
        <ModalFooter>
          <Button
            $padding="8px 16px"
            $radius="16px"
            onClick={() => dispatch(closeModal())}
          >
            Отмена
          </Button>
          <Button $padding="8px 16px" $radius="16px" onClick={handleSaveLayout}>
            Сохранить
          </Button>
        </ModalFooter>
      </ModalContainer>
    </Modal>
  );
};

export default MeshSettings;
