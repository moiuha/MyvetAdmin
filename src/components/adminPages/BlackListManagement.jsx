// BlacklistManagement.js
import React, { useState, useEffect } from 'react';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Box,
  Heading,
  ChakraProvider,
  extendTheme,
} from '@chakra-ui/react';

const theme = extendTheme({
  styles: {
    global: {
      body: {
        bg: 'gray.100',
      },
    },
  },
});

const BlacklistManagement = () => {
  const [removedSellers, setRemovedSellers] = useState([]);

  useEffect(() => {
    const storedRemovedSellers = JSON.parse(localStorage.getItem('removedSellers')) || [];
    setRemovedSellers(storedRemovedSellers);
  }, []);

  return (
    <ChakraProvider theme={theme}>
      <Box p={4}>
        <Heading as="h2" size="lg" mb={4} textAlign="center" color="black" borderBottom="2px solid" borderColor="gray" py={2} boxShadow="lg">
          Banned Sellers
        </Heading>
        <Table variant="striped" colorScheme="blue">
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Email</Th>
            </Tr>
          </Thead>
          <Tbody>
            {removedSellers.map((seller, index) => (
              <Tr key={index}>
                <Td>{seller.name}</Td>
                <Td>{seller.email}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </ChakraProvider>
  );
};

export default BlacklistManagement;
