import React, { useState, useEffect } from 'react'
import { BiEdit, BiPlus, BiSearchAlt, BiShow } from 'react-icons/bi';

import { useDebounce } from '../../../utils/useDebounce';
import { convertToMilliseconds } from '../../../utils/convertToMilliseconds';
import { InputDefault } from '../../../components/Inputs/InputDefault';
import HeaderPage from '../../../components/HeaderPage';
import ButtonDefault from '../../../components/Buttons/ButtonDefault';
import ProgressBar from '../../../components/Ui/ProgressBar';
import { SelectDefault } from '../../../components/Inputs/SelectDefault';

import { ContentDefault, FieldGroupFormDefault, FooterModal } from '../../../components/UiElements/styles';
import { Container, CardProject, TitleCardProject, InfoCardProject, FooterProjectCard, FieldGroupCardProject, ContentCardProject } from './styles';
import ModalDefault from '../../../components/Ui/ModalDefault';
import { useSteps } from '../../../hooks/useSteps';
import InfoGeral from '../ComponentSteps/InfoGeral';
import InfoRevision from '../ComponentSteps/InfoRevision';
import UploadFiles from '../ComponentSteps/UploadFiles';
import Steps from '../Steps';
import { IProjectCreate } from '../../../types';
import InfoProducts from '../ComponentSteps/InfoProducts';

export default function ListProjects() {
  const [modal, setModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 700);
  const [search, setSearch] = useState('');
  const [isSearching, setSearching] = useState(false);

  const [formData, setFormData] = useState<IProjectCreate>({
    tenant_id: '',
    title: '',
    contract_type: '',
    date_start: '',
    date_end: '',
    description: '',
    forProducts: false,
    forDescription: false,
    products: [],
    files: [],
  })

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value, } = event.target
    setFormData((prevData) => {
      return {...prevData, [name]: value}
    })
  }

  const handleOnChangeCheckbox = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { checked, name} = event.target
    setFormData((prevData) => {
      return {...prevData, [name]: checked}
    })
  }

  const formComponents = [
    <InfoGeral data={formData} handleInputChange={handleInputChange} handleOnChangeCheckbox={handleOnChangeCheckbox} />, 
    <InfoProducts />, 
    <UploadFiles />, 
    <InfoRevision />
  ];
  const { changeStep, currentComponent, currentStep, isFirstStep, isLastStep } = useSteps(formComponents);

  useEffect(() => {
    if (debouncedSearchTerm) {
      setSearching(true);
      setSearch(searchTerm);
      const handler = setTimeout(() => {
        setSearching(false);
      }, 500);
      return () => {
        clearTimeout(handler)
      }
    } else {
      setSearch('')
      setSearching(false);
    }
  }, [debouncedSearchTerm]);

  return (
    <Container>
      <HeaderPage title="Projetos">
        <ButtonDefault typeButton="success" onClick={() => setModal(!modal)}>
          <BiPlus color="#fff" />
            Novo Projeto
        </ButtonDefault>
      </HeaderPage>

      <ContentDefault style={{ position: 'relative' }}>
        <FieldGroupFormDefault>
          <InputDefault
            label="Busca"
            name="search"
            placeholder="Busque pelo nome..."
            onChange={(event) => setSearchTerm(event.target.value)}
            icon={BiSearchAlt}
            isLoading={isSearching}
            value={searchTerm}
          />

          <SelectDefault
            label="Filtro por cliente"
            name="client"
            placeHolder="Selecione um cliente"
            onChange={() => {}}
            value={''}
          >
              <option value='0'>Opção um</option>
              <option value='1'>Opção dois</option>
              <option value='2'>Opção tres</option>
          </SelectDefault>

          <SelectDefault
            label="Filtro por data"
            name="data"
            placeHolder="Selecione uma data"
            onChange={() => {}}
            value={''}
          >
              <option value='0'>Opção um</option>
              <option value='1'>Opção dois</option>
              <option value='2'>Opção tres</option>
          </SelectDefault>

        </FieldGroupFormDefault>
      </ContentDefault>

      <ContentDefault style={{ marginTop: '20px' }}>

        <ContentCardProject>
          {[0,1,2,3].map((row) => (
            <CardProject key={row}>
              <TitleCardProject>
                Título do projeto
              </TitleCardProject>

              <InfoCardProject>
                <h3>Cliente: <span>Tropa</span></h3>

                <div className="sectionProgressCardProject">
                  <h3>Atividade: <span>05:50:24</span></h3>
                  <ProgressBar 
                    restHours={convertToMilliseconds('05:10:35')}
                    totalHours={convertToMilliseconds('10:00:00')}
                  />
                </div>
              </InfoCardProject>

              <FooterProjectCard>
                <FieldGroupCardProject>
                  <ButtonDefault typeButton="light">
                    <BiEdit />
                  </ButtonDefault>

                  <ButtonDefault typeButton='info'>
                    <BiShow />
                    Ver Projeto
                  </ButtonDefault>
                </FieldGroupCardProject>
              </FooterProjectCard>
            </CardProject>
          ))}
        </ContentCardProject>
      </ContentDefault>

      <ModalDefault 
        isOpen={modal}
        title='Criar novo Projeto/Contrato'
        onOpenChange={setModal}
      >
        <form onSubmit={(e) => changeStep(currentStep + 1, e)}>
          
          <Steps currentStep={currentStep} />

          <div>{currentComponent}</div>

          <FooterModal>

            <ButtonDefault typeButton='dark' isOutline>
              Descartar
            </ButtonDefault>

            <div className="fieldGroup">
              {!isFirstStep && (
                <ButtonDefault
                  typeButton="primary"
                  isOutline
                  onClick={() => changeStep(currentStep - 1)}
                >
                  Voltar
                </ButtonDefault>
              )}

              {!isLastStep ? (
                <ButtonDefault
                  type='submit'
                  typeButton="primary"
                >
                  Próxima etapa
                </ButtonDefault>
              ) : (
                <ButtonDefault
                  typeButton="primary"
                >
                  Salvar
                </ButtonDefault>
              )}
            </div>
          </FooterModal>
        </form>
      </ModalDefault>
    </Container>
  ) 
}
