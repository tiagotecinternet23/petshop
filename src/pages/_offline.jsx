import Container from "@/components/ui/Container";
import Head from "next/head";
import styled from "styled-components";

export default function Offline() {
  return (
    <>
      <Head>
        <title>Fora do ar - PetShop</title>
      </Head>
      <StyledOffline>
        <h2>Au au au! Foi mal!</h2>
        <Container>
          <h3>Ops! Parece que você está sem Internet!</h3>
        </Container>
      </StyledOffline>
    </>
  );
}

const StyledOffline = styled.section`
  text-align: center;
  img {
    max-width: 100%;
  }
  h2::before {
    content: "👀 ";
  }
`;
