import React, { useState, useEffect } from 'react'
import { BiEdit, BiPlus, BiSearchAlt, BiShow } from 'react-icons/bi';

import { useFetch } from '../../../hooks/useFetch';
import { useDebounce } from '../../../utils/useDebounce';
import { convertToMilliseconds } from '../../../utils/convertToMilliseconds';
import { InputDefault } from '../../../components/Inputs/InputDefault';
import HeaderPage from '../../../components/HeaderPage';
import ButtonDefault from '../../../components/Buttons/ButtonDefault';
import ProgressBar from '../../../components/Ui/ProgressBar';
import { SelectDefault } from '../../../components/Inputs/SelectDefault';

import { ContentDefault, FieldGroupFormDefault } from '../../../components/UiElements/styles';
import { Container, CardProject, TitleCardProject, InfoCardProject, FooterProjectCard, FieldGroupCardProject, ContentCardProject } from './styles';

export default function ListProjects() {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 700);
  const [search, setSearch] = useState('');
  const [isSearching, setSearching] = useState(false);

  const { data, fetchData } = useFetch<any[]>(`flow?search=${search}`);

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
        <ButtonDefault typeButton="success" onClick={() => console.log('!modal')}>
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
    </Container>
  ) 
}
