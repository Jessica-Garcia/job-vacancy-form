import React, { ChangeEvent, InvalidEvent, useEffect, useState } from "react";
import { Input } from "../Input";
import { IVacancyProps } from "../../interfaces/IVacancyProps";
import style from "./style.module.css";
import { v4 as uuidv4 } from "uuid";
import { FilePdf } from "phosphor-react";
import { VacancyPDF } from "../../documents/vacancy/VacancyPDF";
import Modal from "react-modal";

Modal.setAppElement("#root");

type FormProps = {
  selectedVacancy: IVacancyProps;
  setList: (
    current: React.SetStateAction<IVacancyProps[]> | IVacancyProps[]
  ) => void;
  setSelectedVacancy: (
    current: React.SetStateAction<IVacancyProps> | IVacancyProps
  ) => void;
};

export const Form = ({
  selectedVacancy,
  setList,
  setSelectedVacancy,
}: FormProps) => {
  const [vagaDoForm, setVacancy] = useState<IVacancyProps>({} as IVacancyProps);
  const [modalVacancyExistsIsVisible, setModalVacancyExistsIsVisible] =
    useState(false);
  const [modalRequiredFields, setModalRequiredFields] = useState(false);
  /*
        renderiza no form a vaga selecionada no select quando eu clico em determinada vaga no select
    */
  useEffect(() => {
    setVacancy(selectedVacancy);
  }, [selectedVacancy]);

  /*
        quando digitar algo no input, adiciona no input, selecionado pelo nome, o valor 
        que está sendo digitado nele, atribuindo todos os valores digitados na vaga com o setVacancy
    */
  const handleDataChange = (e: ChangeEvent<HTMLInputElement>) => {
    setVacancy((previousValue) => ({
      ...previousValue,
      [e.target.name]: e.target.value,
    }));
  };

  const handleInvalidField = (e: InvalidEvent<HTMLInputElement>) => {
    e.target.setCustomValidity(" ");
  };

  const handleOpenModalVacancyExists = () => {
    setModalVacancyExistsIsVisible(true);
  };

  const handleCloseModalVacancyExists = () => {
    setModalVacancyExistsIsVisible(false);
    backToPageTop();
  };

  const handleOpenModalRequiredFiels = () => {
    setModalRequiredFields(true);
  };

  const handleCloseModalRequiredFields = () => {
    setModalRequiredFields(false);
    backToPageTop();
  };

  const backToPageTop = () => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };

  /*
        Quando for enviar os dados do form
        Se a vaga que está no form tem id, ou seja, se já existe no select, 
        cria-se uma nova lista, percorre-se a lista de vagas já existente e se o id da vaga no form, 
        for igual ao id da vaga da lista do select, edita essa vaga 
        na lista, se não for for igual retorna a vaga da lista.

        Se não houver id da vaga digitada no form, cria uma nova vaga com o que foi digitado, adiciona um id,
        Pega a lista do local storage, adiciona essa lista trasnformada em array em uma variável e devolve para o local storage
        os valores dessa dessa lista mais a nova vaga cadastrada
        e adiciona a nova lista ao select com o set list
     */

  const saveVacancy = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const localStorageItems: IVacancyProps[] = JSON.parse(
      localStorage.getItem("vacancyList") || "[]"
    );

    if (vagaDoForm.id) {
      const vacancyList = localStorageItems.map((itemNoLocalStorage) => {
        if (itemNoLocalStorage.id === vagaDoForm.id) {
          return vagaDoForm;
        }
        return itemNoLocalStorage;
      });
      localStorage.setItem("vacancyList", JSON.stringify(vacancyList));
      setList(vacancyList);
    } else {
      const newVacancy = {
        ...vagaDoForm,
        id: uuidv4(),
      };
      const vacancyList = localStorageItems;
      const vacancyTitleExists = vacancyList.some((item) => {
        return item.title === newVacancy.title;
      });
      if (vacancyTitleExists) {
        return handleOpenModalVacancyExists();
      }
      localStorage.setItem(
        "vacancyList",
        JSON.stringify([...vacancyList, newVacancy])
      );
      setList((current: IVacancyProps[]) => [...current, newVacancy]);
    }
    setSelectedVacancy({
      title: "",
      salary: 0,
      activities: "",
      benefits: "",
      steps: "",
      skills: "",
      experience: "",
    } as IVacancyProps);
  };

  return (
    <div className={style.container}>
      <form
        onSubmit={saveVacancy}
        className={style.formContainer}
        id="vacancyForm"
        autoComplete="off"
      >
        <Input
          name="title"
          labelText="Titulo do Cargo *"
          value={vagaDoForm.title}
          change={handleDataChange}
          invalid={(e) => handleInvalidField(e)}
          required={true}
          autofocus
        />

        <Input
          name="salary"
          type="number"
          labelText="Salário *"
          value={vagaDoForm.salary}
          change={handleDataChange}
          required={true}
          invalid={(e) => handleInvalidField(e)}
          placeholder="0"
        />

        <Input
          name="benefits"
          labelText="Benefícios"
          value={vagaDoForm.benefits}
          invalid={(e) => handleInvalidField(e)}
          change={handleDataChange}
        />

        <Input
          name="steps"
          labelText="Etapas"
          value={vagaDoForm.steps}
          change={handleDataChange}
          invalid={(e) => handleInvalidField(e)}
        />

        <Input
          name="skills"
          labelText="Habilidades"
          value={vagaDoForm.skills}
          change={handleDataChange}
          invalid={(e) => handleInvalidField(e)}
        />

        <Input
          name="experience"
          labelText="Experiêcia"
          value={vagaDoForm.experience}
          change={handleDataChange}
          invalid={(e) => handleInvalidField(e)}
        />
        <div className={style.activities}>
          <Input
            name="activities"
            labelText="Atividades do cargo"
            value={vagaDoForm.activities}
            change={handleDataChange}
            invalid={(e) => handleInvalidField(e)}
          />
        </div>
        <div className={style.buttons}>
          <button
            type="button"
            onClick={
              vagaDoForm.title && vagaDoForm.salary
                ? (e) => VacancyPDF(vagaDoForm)
                : handleOpenModalRequiredFiels
            }
          >
            <FilePdf weight="bold" size={18} />
            Gerar PDF
          </button>
          <button
            type="submit"
            onClick={
              vagaDoForm.title && vagaDoForm.salary
                ? backToPageTop
                : handleOpenModalRequiredFiels
            }
          >
            Salvar
          </button>
        </div>
      </form>
      <Modal
        isOpen={modalVacancyExistsIsVisible}
        onRequestClose={handleCloseModalVacancyExists}
        contentLabel="Example Modal"
        overlayClassName="modal-overlay"
        className="modal-content"
      >
        <div>
          <h4>A vaga já existe!</h4>
        </div>
        <button onClick={handleCloseModalVacancyExists}>X</button>
      </Modal>
      <Modal
        isOpen={modalRequiredFields}
        onRequestClose={handleCloseModalRequiredFields}
        overlayClassName="modal-overlay-req"
        className="modal-content-req"
      >
        <div>
          <h4>Preencha os campos obrigatórios!</h4>
        </div>
        <button onClick={handleCloseModalRequiredFields}>X</button>
      </Modal>
    </div>
  );
};
