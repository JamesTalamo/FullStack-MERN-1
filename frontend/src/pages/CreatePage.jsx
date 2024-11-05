import { Container, VStack, Box, useColorModeValue, Input, Heading, Button } from "@chakra-ui/react"
import { useState, useEffect } from "react"
import { useProductStore } from "../store/product"

import { useToast } from '@chakra-ui/react'

let CreatePage = () => {
    const [newProduct, setNewProduct] = useState({
        name: "",
        price: "",
        image: ""
    })

    let toast = useToast()

    const { createProducts } = useProductStore()

    let handleProduct = async () => {
        // console.log(newProduct)
        const { success, message } = await createProducts(newProduct)
        // console.log("Success", success)
        // console.log("Message", message)

        if (!success) {
            toast({
                title: "Error",
                description: message,
                status: "error",
                duration: 2000,
                isClosable: true
            })
        } else {
            toast({
                title: "Success",
                description: message,
                status: "success",
                duration: 2000,
                isClosable: true
            })
        }

        setNewProduct({ name: "", price: "", image: "" })

    }

    return (
        <Container maxW={"container.sm"}>
            <VStack
                spacing={0}
            >
                <Heading as={"h1"} size={"2xl"} textAlign={"center"} mb={8}>
                    Create New Product
                </Heading>

                <Box
                    width={"full"}
                    bg={useColorModeValue("white", "gray.800")}
                    p={6}
                    rounded={"lg"}
                    shadow={"md"}
                >
                    <VStack spacing={4}>
                        <Input
                            placeHolder='Product Name'
                            name="name"
                            value={newProduct.name}
                            onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                        />

                        <Input
                            placeHolder='Product Price'
                            name="price"
                            value={newProduct.price}
                            onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                        />

                        <Input
                            placeHolder='Product Image'
                            name="image"
                            value={newProduct.image}
                            onChange={((e) => setNewProduct({ ...newProduct, image: e.target.value }))}
                        />

                        <Button w='full' colorScheme="blue" onClick={() => handleProduct()}> Add Product</Button>
                    </VStack>

                </Box>



            </VStack>
        </Container>
    )
}

export default CreatePage