import { Container, VStack, Text, SimpleGrid } from '@chakra-ui/react'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useProductStore } from '../store/product.js'

import ProductCard from '../components/ProductCard.jsx'




let HomePage = () => {
    const { fetchProducts, products } = useProductStore()

    useEffect(() => {
        fetchProducts()
    }, [fetchProducts])
    // console.log(products)

    return (
        <Container maxW={"container.xl"} >
            <VStack spacing={8}>
                <Text
                    fontSize={"30"}
                    fontWeight={"bold"}
                    bgGradient={"linear(to-r, cyan.400, blue.500)"}
                    bgClip={"text"}
                    textAlign={"center"}
                >Current Products</Text>

                <SimpleGrid
                    columns={{
                        base: 1,
                        md: 2,
                        lg: 3,
                    }}
                    spacing={10}
                    w="full"
                >


                    {products.map((product) => (
                        <ProductCard key={product._id} product={product}>

                        </ProductCard>
                    ))}
                </SimpleGrid>



                {products.length ? (<></>) : (<Text
                    fontSize={'xl'}
                    textAlign={"center"}
                    color={'gray.500'}

                    fontWeight={'bold'}
                >
                    No Products Found? {" "}

                    <Link to={'/create'}>
                        <Text
                            as={'span'}
                            color={'blue.500'}
                            _hover={{ textDecoration: 'underline' }}
                        >
                            Create Product
                        </Text>
                    </Link>
                </Text>)}

            </VStack>
        </Container>    
    )
}

export default HomePage