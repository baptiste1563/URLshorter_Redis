
export default function Link() {
    return <p>you will be redirected soon.</p>;
  }
  
  export async function getStaticPaths({ params }) {
    const query = params;
  
    console.log(query);

    const response = await fetch('http://localhost:3000/api/recup', {
        method: 'POST',
        body: JSON.stringify({ id : query }),
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      });
      
      const data = await response.json();
      console.log(data);


    const info = JSON.parse(data);

    if (!info) {
      return {
        notFound: true,
      };
    } else {
      return {
        redirect: {
          destination: info.value,
          permanent: true,
        },
      };
    }
  }