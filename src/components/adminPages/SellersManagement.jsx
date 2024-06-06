import React, { useState, useEffect } from 'react';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Box,
  Button,
  Heading,
  ChakraProvider,
  extendTheme,
  useToast,
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

const SellersManagement = ({ setRemovedSellers }) => {
  const [reportedSellers, setReportedSellers] = useState([]);
  const [upgradeRequests, setUpgradeRequests] = useState([]);
  const toast = useToast();

  useEffect(() => {
    const storedReportedSellers = JSON.parse(localStorage.getItem('reportedSellers')) || [];
    setReportedSellers(storedReportedSellers);
  }, []);

  useEffect(() => {
    const storedReportedSellers = JSON.parse(localStorage.getItem('reportedSellers')) || [];
    if (storedReportedSellers.length === 0) {
      const staticReportedSellers = [
        { id: 1, name: 'mouhamed', email: 'seller1@example.com', products: 10, sales: 100 },
        { id: 2, name: 'Seller Two', email: 'seller2@example.com', products: 5, sales: 50 },
        { id: 3, name: 'Seller Thsdsdree', email: 'sellersd3@example.com', products: 20, sales: 200 },
      ];
      localStorage.setItem('reportedSellers', JSON.stringify(staticReportedSellers));
      setReportedSellers(staticReportedSellers);
    } else {
      setReportedSellers(storedReportedSellers);
    }
  }, []);

  useEffect(() => {
    const fetchUpgradeRequests = async () => {
      try {
        const response = await fetch('http://localhost:5000/requests', {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
          },
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setUpgradeRequests(data.users);
      } catch (error) {
        console.error('Error fetching upgrade requests:', error);
        toast({
          title: 'Error fetching upgrade requests',
          description: error.message,
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      }
    };

    fetchUpgradeRequests();
  }, [toast]);

  const handleRemoveSeller = (sellerId) => {
    const removedSeller = reportedSellers.find((seller) => seller.id === sellerId);
    if (removedSeller) {
      const updatedRemovedSellers = JSON.parse(localStorage.getItem('removedSellers')) || [];
      updatedRemovedSellers.push(removedSeller);
      localStorage.setItem('removedSellers', JSON.stringify(updatedRemovedSellers));
      setRemovedSellers(updatedRemovedSellers);

      const updatedReportedSellers = reportedSellers.filter((seller) => seller.id !== sellerId);
      localStorage.setItem('reportedSellers', JSON.stringify(updatedReportedSellers));
      setReportedSellers(updatedReportedSellers);

      toast({
        title: 'Seller Removed',
        description: `${removedSeller.name} has been removed and added to the blacklist.`,
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleAcceptSellerRequest = async (userId) => {
    try {
      const response = await fetch(`http://localhost:5000/account/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
        },
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setUpgradeRequests((prev) => prev.filter((request) => request._id !== userId));
      toast({
        title: 'Seller Request Accepted',
        description: data.message,
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.error('Error upgrading user to seller:', error);
      toast({
        title: 'Error',
        description: 'There was an error upgrading the user to a seller.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <ChakraProvider theme={theme}>
      <Box p={4}>
        <Heading as="h2" size="lg" mb={4} textAlign="center" color="black" borderBottom="2px solid" borderColor="gray" py={2} boxShadow="lg">
          Seller Upgrade Requests
        </Heading>
        <Table variant="striped" colorScheme="blue">
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Email</Th>
              <Th>Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            {upgradeRequests.map((request) => (
              <Tr key={request._id}>
                <Td>{request.name}</Td>
                <Td>{request.email}</Td>
                <Td>
                  <Button colorScheme="green" size="sm" onClick={() => handleAcceptSellerRequest(request._id)}>Accept</Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>

        <Heading as="h2" size="lg" mb={4} textAlign="center" color="black" borderBottom="2px solid" borderColor="gray" py={2} boxShadow="lg">
          Reported Sellers
        </Heading>
        <Table variant="striped" colorScheme="blue">
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Email</Th>
              <Th>Products</Th>
              <Th>Sales</Th>
              <Th>Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            {reportedSellers.map((seller) => (
              <Tr key={seller.id}>
                <Td>{seller.name}</Td>
                <Td>{seller.email}</Td>
                <Td>{seller.products}</Td>
                <Td>{seller.sales}</Td>
                <Td>
                  <Button colorScheme="red" size="sm" onClick={() => handleRemoveSeller(seller.id)}>Remove</Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </ChakraProvider>
  );
};

export default SellersManagement;
