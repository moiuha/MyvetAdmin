import React, { useState } from 'react';
import image from '../../Assets/cn50604722_1600x.jpg';
import {
  Box,
  Button,
  Image,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Heading,
  Stack,
  Grid,
  GridItem,
  IconButton,
  Tooltip,
  useToast,
} from '@chakra-ui/react';
import { FaTrash } from 'react-icons/fa';

const ProductsManagement = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const toast = useToast();
  const [products, setProducts] = useState([
    { id: 1, name: 'Product 1', seller: 'Seller 1', price: '1000 DA', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', image:image},
    { id: 2, name: 'Product 2', seller: 'Seller 2', price: '1500 DA', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', image: image },
    { id: 3, name: 'Product 3', seller: 'Seller 3', price: '1200 DA', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', image: image },
  ]);

  const handleRemoveProduct = (id) => {
    const updatedProducts = products.filter(product => product.id !== id);
    setProducts(updatedProducts);
    localStorage.setItem('products', JSON.stringify(updatedProducts));

    toast({
      title: 'Product Removed',
      description: `Product with ID ${id} has been removed.`,
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <Box p={4} bg="gray.100" minHeight="100vh">
      <Heading as="h2" size="lg" mb={4} textAlign="center" color="blue.700">Reported Products Management</Heading>

      <Grid templateColumns="repeat(3, 1fr)" gap={4}>
        {products.map((product) => (
          <GridItem key={product.id}>
            <Box borderWidth="1px" borderRadius="lg" overflow="hidden" boxShadow="md" bg="white">
              <Image src={product.image} alt={product.name} />

              <Box p="6">
                <Stack spacing={3}>
                  <Heading as="h3" size="md" color="blue.800">{product.name}</Heading>
                  <Heading as="h4" size="sm" color="green.700">Seller: {product.seller}</Heading>
                  <Heading as="h4" size="sm" color="purple.700">Price: {product.price}</Heading>
                  <p>{product.description}</p>
                </Stack>

                <Stack mt={4} direction="row" spacing={4} justify="flex-end">
                  <Tooltip label="Remove Product" placement="top">
                    <IconButton
                      aria-label="Remove Product"
                      icon={<FaTrash />}
                      colorScheme="red"
                      onClick={() => {
                        setSelectedProduct(product);
                        onOpen();
                      }}
                    />
                  </Tooltip>
                </Stack>
              </Box>
            </Box>
          </GridItem>
        ))}
      </Grid>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Remove Product</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            Are you sure you want to remove {selectedProduct && selectedProduct.name}?
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="red" mr={3} onClick={() => handleRemoveProduct(selectedProduct.id)}>
              Remove
            </Button>
            <Button variant="ghost" onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default ProductsManagement;
