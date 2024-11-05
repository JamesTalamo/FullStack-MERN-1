import { Box, Image, Heading, Text, HStack, IconButton, useColorModeValue, useToast, VStack, Input, Button } from "@chakra-ui/react"

import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    ModalCloseButton,
    useDisclosure
} from '@chakra-ui/react'

import { EditIcon, DeleteIcon } from "@chakra-ui/icons"

import { useState } from "react"

import { useProductStore } from "../store/product"

let ProductCard = ({ product }) => {


    const { isOpen, onOpen, onClose } = useDisclosure()

    let toast = useToast()

    let { deleteProducts, updateProducts } = useProductStore()


    let handleDelete = async (productId) => {


        const { success, message } = await deleteProducts(productId)
        console.log(message, 'dsds')
        if (!success) {
            toast({
                title: "Error",
                description: message,
                status: 'error',
                duration: 3000,
                isClosable: true
            })
        } else {
            toast({
                title: "Success",
                description: message,
                status: 'success',
                duration: 3000,
                isClosable: true
            })
        }
    }

    let [update, setUpdate] = useState(product)

    let handleUpdate = async (productId) => {
        // console.log('Updating ', productId)
        // console.log(update)
        const { success, message } = await updateProducts(productId, update)
        // console.log(success, message)
        if (!success) {
            toast({
                title: 'Error',
                description: message,
                status: 'error',
                duration: 3000,
                isClosable: true
            })
        } else {
            toast({
                title: 'Success',
                description: message,
                status: 'success',
                duration: 3000,
                isClosable: true
            })
        }

        onClose()


    }

    const textColor = useColorModeValue("gray.600", "gray.200")
    const bg = useColorModeValue("white", "gray.800")

    return (
        <Box
            shadow={'lg'}
            rounded={'lg'}
            overflow={'hidden'}
            transition={'all 0.3s'}
            _hover={{ transform: "translateY(-5px)", shadow: 'xl' }}
            bg={bg}
        >
            <Image src={product.image} alt={product.name} h={48} w={'full'} objectFit={'cover'} />

            <Box p={4}>
                <Heading
                    as={'h3'}
                    size={'md'}
                    mb={2}
                >
                    {product.name}
                </Heading>

                <Text
                    fontWeight={'bold'}
                    fontSize={'xl'}
                    color={textColor}
                    mb={4}
                >
                    {`$${product.price}`}
                </Text>

                <HStack spacing={2}>
                    <IconButton icon={<EditIcon />} colorScheme="blue" onClick={() => onOpen()}>  </IconButton>
                    <IconButton icon={<DeleteIcon />} colorScheme="red" onClick={() => handleDelete(product._id)}>  </IconButton>
                </HStack>

            </Box>

            <Modal
                onClose={onClose}
                isOpen={isOpen}

            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Update Product</ModalHeader>
                    <ModalCloseButton />

                    <ModalBody>
                        <VStack spacing={4} pb={10}>
                            <Input placeholder='Product Name' name='name' value={update.name} onChange={(e) => setUpdate({ ...update, name: e.target.value })}/>

                            <Input placeholder='Product Price' name='price' value={update.price} onChange={(e) => setUpdate({ ...update, price: e.target.value })}/>

                            <Input placeholder='Product url' name='image' value={update.image} onChange={(e) => setUpdate({ ...update, image: e.target.value })} />
                        </VStack>
                    </ModalBody>

                    <ModalFooter>
                        <HStack spacing={4}>
                            <Button colorScheme="blue" onClick={() => handleUpdate(product._id)}>
                                Update
                            </Button>
                            <Button colorScheme="red">
                                Cancel
                            </Button>
                        </HStack>
                    </ModalFooter>

                </ModalContent>

            </Modal>

        </Box>
    )
}

export default ProductCard