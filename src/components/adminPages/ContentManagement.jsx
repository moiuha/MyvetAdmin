import React, { useState } from 'react';
import {
  Box,
  Heading,
  Stack,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  useToast,
  ChakraProvider,
  extendTheme,
  GlobalStyle
} from '@chakra-ui/react';
import { FaTrash, FaEdit, FaArrowUp, FaArrowDown } from 'react-icons/fa';



const theme = extendTheme({
  styles: {
    global: {
      body: {
        bg: 'gray.100', 
      },
    },
  },
});

const ContentManagement = ({things}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedContent, setSelectedContent] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [formData, setFormData] = useState({});
  const [products, setProducts] = useState(things.Shoe);
  const toast = useToast();

  const handleRemoveContent = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/product/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'jwt': localStorage.getItem("jwt"),
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete product');
      }

      setProducts(products.filter(product => product._id !== id));
      toast({
        title: 'Product Removed',
        description: `Product with ID ${id} has been removed.`,
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to delete product.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      console.error(error);
    }
  };

  const handleEditContent = (product) => {
    setSelectedContent(product);
    setFormData({ ...product });
    setIsEditMode(true);
    onOpen();
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch(`http://localhost:5000/admin/product/${selectedContent.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'jwt': localStorage.getItem("jwt"),

        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to update product');
      }

      setProducts(products.map(product => (product.id === selectedContent.id ? formData : product)));
      toast({
        title: 'Product Edited',
        description: `Product with ID ${selectedContent.id} has been edited.`,
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update product.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      console.error(error);
    } finally {
      onClose();
      setFormData({});
      setIsEditMode(false);
    }
  };

  const handleMoveUp = (index) => {
    if (index > 0) {
      const newProducts = [...products];
      [newProducts[index - 1], newProducts[index]] = [newProducts[index], newProducts[index - 1]];
      setProducts(newProducts);
    }
  };

  const handleMoveDown = (index) => {
    if (index < products.length - 1) {
      const newProducts = [...products];
      [newProducts[index + 1], newProducts[index]] = [newProducts[index], newProducts[index + 1]];
      setProducts(newProducts);
    }
  };

  const handleUpdateHomepage = async () => {
    try {
      const response = await fetch('http://localhost:5000/homepage', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'jwt': localStorage.getItem("jwt"),
        },
        body: JSON.stringify({
          products ,
          edit: things.Shoe, 
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update homepage');
      }

      toast({
        title: 'Homepage Updated',
        description: 'Homepage products have been updated.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update homepage.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      console.error(error);
    }
  };

  return (
    <ChakraProvider theme={theme}>
      <GlobalStyle />
      <Box p={8}>
        <Heading as="h2" size="xl" mb={8} textAlign="center" color="blue.700">
          Content Management for {things.promoted ? 'Promoted' : ''}
        </Heading>

        <Stack spacing={8}>
          {products.map((product, index) => (
            <Box
              key={product.id}
              p={4}
              borderWidth="1px"
              borderRadius="lg"
              boxShadow="md"
              bg='white'
            >
              <Heading as="h3" size="md" mb={2}>{product.name}</Heading>
              <div>{product.description}</div>
              <img src={product.pic} alt={product.name} width="100" />
              <Stack mt={4} direction="row" spacing={4} justify="flex-end">
                <Button size="sm" leftIcon={<FaArrowUp />} onClick={() => handleMoveUp(index)}>Up</Button>
                <Button size="sm" leftIcon={<FaArrowDown />} onClick={() => handleMoveDown(index)}>Down</Button>
                <Button colorScheme="red" size="sm" leftIcon={<FaTrash />} onClick={() => handleRemoveContent(product._id)}>Remove</Button>
              </Stack>
            </Box>
          ))}
        </Stack>


        <Button colorScheme="teal" size="lg" onClick={handleUpdateHomepage}>UPDATE</Button>
      </Box>
    </ChakraProvider>
  );
};

export default ContentManagement;
