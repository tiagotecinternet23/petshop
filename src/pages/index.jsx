import Head from "next/head";
import { useState } from "react";
import styled from "styled-components";
import ListaPosts from "@/components/ListaPosts";
import ListaCategorias from "@/components/ListaCategorias";
import serverApi from "./api/server";

export async function getStaticProps() {
  try {
    const resposta = await fetch(`${serverApi}/posts.json`);
    const dados = await resposta.json();
    console.log(dados);

    if (!resposta.ok) {
      throw new Error(`Erro: ${resposta.status} - ${resposta.statusText}`);
    }

    const categorias = dados.map((post) => post.categoria);
    const categoriasUnicas = [...new Set(categorias)];

    return {
      props: {
        posts: dados,
        categorias: categoriasUnicas,
      },
    };
  } catch (error) {
    console.error("Deu ruim: " + error.message);
    return {
      notFound: true,
    };
  }
}

export default function Home({ posts, categorias }) {
  const [listaDePosts, setListaDePosts] = useState(posts);
  const [filtroAtivo, setFiltroAtivo] = useState(false);
  const [categoriaAtiva, setCategoriaAtiva] = useState("");

  const filtrar = (event) => {
    const categoriaEscolhida = event.currentTarget.textContent;

    const novaListaDePosts = posts.filter(
      (post) => post.categoria === categoriaEscolhida
    );

    // Sinalizando o state como filtro ativo (true)
    setFiltroAtivo(true);
    setListaDePosts(novaListaDePosts);

    // Sinalizando o state com o texto/categoria escolhida
    setCategoriaAtiva(categoriaEscolhida);
  };

  const limparFiltro = () => {
    // Sinalizando o state como filtro inativo (false)
    setFiltroAtivo(false);

    // Atualizando o state da listaDePosts para os posts originais
    setListaDePosts(posts);

    // Atualizando o state da categoria ativa para vazio ""
    setCategoriaAtiva("");
  };

  return (
    <>
      <Head>
        <title>PetShop</title>
        <meta
          name="description"
          content="Web App PetShop criado com Next.js como exemplo do curso Téc. Informática para Internet"
        />
        <meta name="keywords" content="PetShop, Banho, Ração, Gato, Cachorro" />
      </Head>
      <StyledHome>
        <h2>Pet Notícias</h2>

        <ListaCategorias
          {...{
            categorias,
            categoriaAtiva,
            onFiltrar: filtrar,
            onLimparFiltro: limparFiltro,
            filtroAtivo,
          }}
        />
        <ListaPosts posts={listaDePosts} />
      </StyledHome>
    </>
  );
}

const StyledHome = styled.section`
  h2::before {
    content: "📰 ";
  }
`;
