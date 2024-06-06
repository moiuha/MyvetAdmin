import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import {
  Box,
  Heading,
  Text,
  Flex,
  ChakraProvider,
  extendTheme,
  GlobalStyle
} from '@chakra-ui/react';

const salesData = [
  { name: 'Jan', Sales: 4000 },
  { name: 'Feb', Sales: 3000 },
  { name: 'Mar', Sales: 5000 },
  { name: 'Apr', Sales: 2000 },
  { name: 'May', Sales: 6000 },
  { name: 'Jun', Sales: 4000 },
  { name: 'Jul', Sales: 8000 },
  { name: 'Aug', Sales: 7000 },
  { name: 'Sep', Sales: 9000 },
  { name: 'Oct', Sales: 6000 },
  { name: 'Nov', Sales: 7000 },
  { name: 'Dec', Sales: 10000 },
];

const bestSellersData = [
  { id: 1, name: '3ami 7md', sales: 120 },
  { id: 2, name: '3amo 7md', sales: 100 },
  { id: 3, name: '3mq 7md', sales: 90 },
  { id: 4, name: 'ahmedD', sales: 80 },
  { id: 5, name: 'baqaaaaaaaaar ', sales: 70 },
];

const bestProductsData = [
  { id: 1, name: 'Product X', sales: 150 },
  { id: 2, name: 'Product Y', sales: 130 },
  { id: 3, name: 'Product Z', sales: 110 },
  { id: 4, name: 'Product W', sales: 100 },
  { id: 5, name: 'Product V', sales: 90 },
];

const theme = extendTheme({
  styles: {
    global: {
      body: {
        bg: 'gray.100', // Set your desired background color here
      },
    },
  },
});

const Stats = () => {
  return (
    <ChakraProvider theme={theme}>
      <GlobalStyle />
      <Box p={8} maxWidth="1200px" margin="0 auto">
        <Heading as="h1" textAlign="center" fontSize="3xl" mb={8} color="blue.700">Sales Overview</Heading>
        <Flex justify="center" mb={8}>
          <ResponsiveContainer width="90%" height={400}>
            <LineChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="Sales" stroke="#3182ce" />
            </LineChart>
          </ResponsiveContainer>
        </Flex>
        <Flex justify="space-between" mt={8}>
          <Box
            flexBasis="45%"
            borderRadius="lg"
            borderWidth="1px"
            borderColor="gray.300"
            p={4}
            bg="white" // Set background color to white
            boxShadow="md" // Add external shadow
          >
            <Heading as="h2" textAlign="center" fontSize="xl" mb={4} color="green.700">Best Sellers</Heading>
            {bestSellersData.map(item => (
              <Box key={item.id} mb={2} borderBottom="1px solid" borderColor="gray.200" pb={2}>
                <Text><strong>{item.name}</strong> - Sales: {item.sales}</Text>
              </Box>
            ))}
          </Box>
          <Box
            flexBasis="45%"
            borderRadius="lg"
            borderWidth="1px"
            borderColor="gray.300"
            p={4}
            bg="white"
            boxShadow="md" 
          >
            <Heading as="h2" textAlign="center" fontSize="xl" mb={4} color="purple.700">Best Products</Heading>
            {bestProductsData.map(item => (
              <Box key={item.id} mb={2} borderBottom="1px solid" borderColor="gray.200" pb={2}>
                <Text><strong>{item.name}</strong> - Sales: {item.sales}</Text>
              </Box>
            ))}
          </Box>
        </Flex>
      </Box>
    </ChakraProvider>
  );
};

export default Stats;
