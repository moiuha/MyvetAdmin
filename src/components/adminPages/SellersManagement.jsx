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
        { id: 3, name: 'Seller Three', email: 'seller3@example.com', products: 20, sales: 200 },
      ];
      localStorage.setItem('reportedSellers', JSON.stringify(staticReportedSellers));
      setReportedSellers(staticReportedSellers);
    } else {
      setReportedSellers(storedReportedSellers);
    }
  }, []);

  useEffect(() => {
    const storedUpgradeRequests = JSON.parse(localStorage.getItem('upgradeRequests')) || [];
    if (storedUpgradeRequests.length === 0) {
      const staticUpgradeRequests = [
        { id: 1, name: 'ami mouh', email: 'amimouh@example.com' },
        { id: 2, name: 'amin', email: 'amin@example.com' },
        { id: 3, name: 'test1', email: 'test1@example.com' },
      ];
      localStorage.setItem('upgradeRequests', JSON.stringify(staticUpgradeRequests));
      setUpgradeRequests(staticUpgradeRequests);
    } else {
      setUpgradeRequests(storedUpgradeRequests);
    }
  }, []);

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

  const handleAcceptSellerRequest = (userId) => {
    const acceptedRequest = upgradeRequests.find((request) => request.id === userId);
    if (acceptedRequest) {
      const updatedUpgradeRequests = upgradeRequests.filter((request) => request.id !== userId);
      localStorage.setItem('upgradeRequests', JSON.stringify(updatedUpgradeRequests));
      setUpgradeRequests(updatedUpgradeRequests);

      toast({
        title: 'Seller Request Accepted',
        description: `${acceptedRequest.name} has been upgraded to seller.`,
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleRefuseSellerRequest = (userId) => {
    const refusedRequest = upgradeRequests.find((request) => request.id === userId);
    if (refusedRequest) {
      const updatedUpgradeRequests = upgradeRequests.filter((request) => request.id !== userId);
      localStorage.setItem('upgradeRequests', JSON.stringify(updatedUpgradeRequests));
      setUpgradeRequests(updatedUpgradeRequests);

      toast({
        title: 'Seller Request Refused',
        description: `${refusedRequest.name}'s request has been refused.`,
        status: 'info',
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
              <Tr key={request.id}>
                <Td>{request.name}</Td>
                <Td>{request.email}</Td>
                <Td>
                  <Button colorScheme="green" size="sm" onClick={() => handleAcceptSellerRequest(request.id)}>Accept</Button>
                  <Button colorScheme="red" size="sm" ml={2} onClick={() => handleRefuseSellerRequest(request.id)}>Refuse</Button>
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
