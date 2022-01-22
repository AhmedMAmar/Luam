import Link from 'next/link';
import Image from 'next/image';
import { Flex, Box, Text, Button } from '@chakra-ui/react';
import  useUser  from "@auth0/nextjs-auth0";

import Property from '../components/Property';
import { baseUrl, fetchApi } from '../utils/fetchApi';

export const Banner = ({ purpose, title1, title2, desc1, desc2, buttonText, linkName, imageUrl }) => (
  <Flex flexWrap='wrap' justifyContent='center' alignItems='center' m='10'>
    <Image src={imageUrl} width={500} height={300} />
    <Box p='5'>
      <Text color='gray.500' fontSize='sm' fontWeight='medium'>{purpose}</Text>
      <Text fontSize='3xl' fontWeight='bold'>{title1}<br />{title2}</Text>
      <Text fontSize='lg' paddingTop='3' paddingBottom='3' color='gray.700'>{desc1}<br />{desc2}</Text>
      <Button fontSize='xl' bg="blue.300" color="white">
        <Link href={linkName}><a>{buttonText}</a></Link>
      </Button>
    </Box>
  </Flex>
);


const Home = ({ propertiesForSale, propertiesForRent }) => (
  
  <Box>
    <Banner
      purpose='Louer une Maison'
      title1='Location des Maisons pour'
      title2='le monde'
      desc1=' Explorer from Apartments, villas'
      desc2='et Plus....'
      buttonText='Explorer location'
      linkName='/search?purpose=for-rent'
      imageUrl='https://bayut-production.s3.eu-central-1.amazonaws.com/image/145426814/33973352624c48628e41f2ec460faba4'
    />
    <Flex flexWrap='wrap'>
      {propertiesForRent.map((property) => <Property property={property} key={property.id} />)}
    </Flex>
    <Banner
      purpose='ACHETER UNE MAISON'
      title1=' chercher, ACHETER ,VOTRE'
      title2='Maison de reve'
      desc1=' Explorer des Apartments, villas'
      desc2=' et Plus....'
      buttonText='Explorer Acheter'
      linkName='/search?purpose=for-sale'
      imageUrl='https://bayut-production.s3.eu-central-1.amazonaws.com/image/110993385/6a070e8e1bae4f7d8c1429bc303d2008'
    />
    <Flex flexWrap='wrap'>
      {propertiesForSale.map((property) => <Property property={property} key={property.id} />)}
    </Flex>
  </Box>
);

export async function getStaticProps() {
  const propertyForSale = await fetchApi(`${baseUrl}/properties/list?locationExternalIDs=5002&purpose=for-sale&hitsPerPage=6`);
  const propertyForRent = await fetchApi(`${baseUrl}/properties/list?locationExternalIDs=5002&purpose=for-rent&hitsPerPage=6`);

  return {
    props: {
      propertiesForSale: propertyForSale?.hits,
      propertiesForRent: propertyForRent?.hits,
    },
  };
}

export default Home;