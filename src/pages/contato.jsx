import Container from "@/components/ui/Container";
import Head from "next/head";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import serverApi from "./api/server";
import { useRouter } from "next/router";

export default function Contato() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  let router = useRouter();

  const enviarContato = async (dados) => {
    const { nome, email, mensagem } = dados;

    const opcoes = {
      method: "POST",
      body: JSON.stringify({ nome, email, mensagem }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    };

    try {
      await fetch(`${serverApi}/contatos.json`, opcoes);
      alert("Dados enviados!");
      router.push("/");
    } catch (error) {
      console.error("Deu ruim no envio: " + error.message);
    }
  };

  return (
    <>
      <Head>
        <title>Contato - PetShop</title>
        <meta
          name="description"
          content="Entre em contato conosco pelo formulário abaixo"
        />
        <meta name="keywords" content="petshop, contato" />
      </Head>
      <StyledContato>
        <h2>Fale Conosco</h2>

        <Container>
          <form
            autoComplete="off"
            action=""
            method="post"
            onSubmit={handleSubmit((dados) => {
              enviarContato(dados);
            })}
          >
            <div>
              <label htmlFor="nome">Nome: </label>
              <input
                {...register("nome", { required: true })}
                type="text"
                name="nome"
                id="nome"
              />
            </div>

            {/* ? é conhecido  "Optional Chaining [encadeamento opcional]"
É usado para evitar erros caso uma propriedade de um objeto seja
null ou undefined. Caso não seja null/undefined, aí sim verificamos
se o type é required para seguir com a validação. */}

            {errors.nome?.type == "required" && <p>Você deve digitar o nome</p>}

            <div>
              <label htmlFor="email">E-mail: </label>
              <input
                {...register("email", { required: true })}
                type="email"
                name="email"
                id="email"
              />
            </div>
            {errors.email?.type == "required" && (
              <p>Você deve digitar o e-mail</p>
            )}

            <div>
              <label htmlFor="mensagem">Mensagem:</label>
              <textarea
                {...register("mensagem", {
                  required: true,
                  minLength: 20,
                })}
                maxLength={500}
                name="mensagem"
                id="mensagem"
                cols="30"
                rows="8"
              ></textarea>
            </div>

            {errors.mensagem?.type == "required" && (
              <p>Você deve digitar uma mensagem</p>
            )}

            {errors.mensagem?.type == "minLength" && (
              <p>Escreva pelo menos 20 caracteres</p>
            )}

            <div>
              <button type="submit">Enviar mensagem</button>
            </div>
          </form>
        </Container>
      </StyledContato>
    </>
  );
}

const StyledContato = styled.section`
  h2::before {
    content: "💌 ";
  }

  form > div {
    margin-bottom: 0.5rem;
    display: flex;
    justify-content: space-between;

    /* Seletor + significa "elemento adjacente",
    ou seja, pegar os parágrafos que estão depois 
    da div. */
    & + p {
      color: red;
      font-size: 0.8rem;
      font-style: italic;
    }

    & label {
      font-weight: bold;
      width: 30%;
      display: flex;
      align-items: center;
    }

    & input,
    & textarea {
      width: 70%;
      border: none;
      box-shadow: var(--sombra-box);
      padding: 0.5rem;
    }

    & button {
      background-color: var(--cor-primaria-fundo);
      color: var(--cor-primaria);
      padding: 1rem;
      border: none;
      cursor: pointer;
    }
  }
`;
