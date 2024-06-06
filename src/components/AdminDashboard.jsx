import React, { useState,useEffect, useRef } from "react";
import { Box, Button, Flex, Heading, Spacer } from "@chakra-ui/react";
import { CaretLeft, CaretRight, User, ShoppingBag, Gear, SignOut } from "phosphor-react";
import { useDisclosure } from "@chakra-ui/hooks";
import { AlertDialog, AlertDialogBody, AlertDialogFooter, AlertDialogHeader, AlertDialogContent, AlertDialogOverlay } from "@chakra-ui/react";
import { useToast } from "@chakra-ui/toast";
import { WarningTwoIcon } from "@chakra-ui/icons";
import { Skeleton } from "@chakra-ui/react";
import ContentManagement from "./adminPages/ContentManagement";
import SellersManagement from "./adminPages/SellersManagement";
import ProductsManagement from "./adminPages/ProductsManagement";
import Stats from "./adminPages/Stats";
import { useNavigate } from "react-router-dom";
import BlacklistManagement from "./adminPages/BlackListManagement";


const AdminDashboard = () => {
  const toast = useToast();
  const [selected, setSelected] = useState(1);
  const [isExpanded, setIsExpanded] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [homePage, setHomePage] = useState();
  const cancelRef = useRef();
  const Navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [removedSellers, setRemovedSellers] = useState([]);

  useEffect(() => {
    
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:5000/homepage');

        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }

        const data = await response.json();
        setProducts(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        console.error(error);
        setLoading(false);
      }
    };

    fetchProducts();

  
  }, []);

  const handleLogout = () => {
    // Logout logic here
    localStorage.removeItem("jwt");
    localStorage.removeItem("user");
    Navigate("/login")
    window.location.reload();
  };

  const isLoading = false;
  const user = {
    firstName: "John",
    pic: "/path/to/profile-pic.jpg",
    isSeller: false // or true
  };

  if (isLoading || !user) {
    return <Skeleton height="20px" />;
  }

  return (
    <Box
      display={"flex"}
      flexDirection={{ base: "column", md: "row" }}
      position={"relative"}
      height={"91.5vh"}
      overflow={"hidden"}
    >
      <Box
        width={{ base: "100%", md: isExpanded ? "20%" : "90px" }}
        bg={"#F2F2F2"}
        height={{ base: isExpanded ? "100%" : "10px", md: "100%" }}
        borderRight={"2px"}
        borderColor={"#E5E5E5"}
        pt={20}
        pb={isExpanded ? 20 : 0}
        overflow={"hidden"}
        textAlign={"center"}
        display={"flex"}
        flexDirection={"column"}
        boxShadow="0px 0px 10px rgba(0, 0, 0, 0.1)"
        padding="20px"
      >
        <Button
          onClick={() => setIsExpanded(!isExpanded)}
          position={"absolute"}
          top={4}
          left={4}
        >
          {isExpanded ? <CaretLeft size={20} /> : <CaretRight size={20} />}
        </Button>
        
        <Box // Wrap the sidebar content in a flex container
          display="flex" // Apply flexbox
          flexDirection="column" // Stack items vertically
          flexGrow="1" // Allow content to grow and fill space
          flexWrap="wrap" // Allow items to wrap onto multiple lines
        >

          <Flex
            cursor={"pointer"}
            gap={8}
            align={"center"}
            mb={4}
            mt={10}
            pl={8}
            py={4}
            onClick={() => {
              setSelected(1);
              setIsExpanded(false);
            }}
            bg={selected === 1 ? "#BBB" : "initial"}
            borderRight={selected === 1 ? "2px solid black" : "none"}
            boxShadow="0px 4px 10px rgba(0, 0, 0, 0.1)"
            padding="10px"
            borderRadius="8px"
          >
            <User size={20} weight="bold" />
            <Heading
              fontSize={20}
              fontWeight={"regular"}
              display={isExpanded ? "" : "none"}
              md={isExpanded ? "-40px" : "0"}
              
              ml={isExpanded ? "-20px" : "0"}
            >
              Admin Statistics
            </Heading>
          </Flex>
          <Flex
            cursor={"pointer"}
            onClick={() => {
              setSelected(2);
              setIsExpanded(false);
            }}
            gap={8}
            align={"center"}
            mb={4}
            pl={8}
            py={4}
            bg={selected === 2 ? "#BBB" : "initial"}
            borderRight={selected === 2 ? "2px solid black" : "none"}
            boxShadow="0px 4px 10px rgba(0, 0, 0, 0.1)"
            padding="10px"
            borderRadius="8px"
          >
            <Gear size={20} weight="bold" />
            <Heading
              fontSize={20}
              fontWeight={"regular"}
              display={isExpanded ? "" : "none"}
              md={isExpanded ? "-40px" : "0"}
              
              ml={isExpanded ? "-20px" : "0"}
            >
              Content Management
            </Heading>
          </Flex>
          <Flex
            cursor={"pointer"}
            onClick={() => {
              setSelected(3);
              setIsExpanded(false);
            }}
            gap={8}
            align={"center"}
            mb={4}
            pl={8}
            py={4}
            bg={selected === 3 ? "#BBB" : "initial"}
            borderRight={selected === 3 ? "2px solid black" : "none"}
            boxShadow="0px 4px 10px rgba(0, 0, 0, 0.1)"
            padding="10px"
            borderRadius="8px"
            
          >
            <ShoppingBag size={20} weight="bold" />
            <Heading
              
              fontSize={20}
              fontWeight={"regular"}
              display={isExpanded ? "" : "none"}
              md={isExpanded ? "-40px" : "0"}
              
              
              ml={isExpanded ? "-20px" : "0"}
            >
              Sellers Management
            </Heading>
          </Flex>
          <Flex
            cursor={"pointer"}
            onClick={() => {
              setSelected(4);
              setIsExpanded(false);
            }}
            gap={8}
            align={"center"}
            mb={4}
            pl={8}
            py={4}
            bg={selected === 4 ? "#BBB" : "initial"}
            borderRight={selected === 4 ? "2px solid black" : "none"}
            boxShadow="0px 4px 10px rgba(0, 0, 0, 0.1)"
            padding="10px"
            borderRadius="8px"
          >
            <ShoppingBag size={20} weight="bold" />
            <Heading
              fontSize={20}
              fontWeight={"regular"}
              display={isExpanded ? "" : "none"}
              md={isExpanded ? "-40px" : "0"}
              
              ml={isExpanded ? "-20px" : "0"}
             
            >
              Products Management
            </Heading>
          </Flex>
          <Flex
            cursor={"pointer"}
            onClick={() => {
              setSelected(5);
              setIsExpanded(false);
            }}
            gap={8}
            align={"center"}
            mb={4}
            pl={8}
            py={4}
            bg={selected === 5 ? "#BBB" : "initial"}
            borderRight={selected === 5 ? "2px solid black" : "none"}
            boxShadow="0px 4px 10px rgba(0, 0, 0, 0.1)"
            padding="10px"
            borderRadius="8px"
          >
            <WarningTwoIcon boxSize={5} /> 
            <Heading
              fontSize={20}
              fontWeight={"regular"}
              display={isExpanded ? "" : "none"}
              md={isExpanded ? "-40px" : "0"}
              
              ml={isExpanded ? "-20px" : "0"}
             
            >
              Blacklist Management
            </Heading>
          </Flex>
          
        </Box>
        

        <Spacer />
        <Flex
          cursor={"pointer"}
          onClick={onOpen}
          gap={8}
          align={"center"}
          mb={8}
          pl={8}
          py={4}
          display={{ base: "none", md: "flex" }}
          bg={"red.600"}
          _hover={{ bg: "red.500" }}
          color={"white"}
          rounded={isExpanded ? "md" : "0"}
          width={isExpanded ? "80%" : "100%"}
          mx={isExpanded ? "auto" : "0"}
          boxShadow="0px 4px 10px rgba(0, 0, 0, 0.1)"
          padding="10px"
          borderRadius="8px"
        >
          <Button as={Box} 
            bg={"transparent"}
            size={'full'}
          >
          <SignOut size={20} weight="bold" />
          <Heading
            fontSize={20}
            fontWeight={"regular"}
            display={isExpanded ? "" : "none"}
            ml={2}
          >
            Log out
          </Heading>
          </Button>
        </Flex>
      </Box>

      <Box width={"100%"} height={"100%"} overflow={"scroll"}>
        {selected === 1 && <Stats />}
        {selected === 2 && <ContentManagement things={products} />}
        {selected === 3 && <SellersManagement setRemovedSellers={setRemovedSellers} />}
        {selected === 4 && <ProductsManagement />}
        {selected === 5 && <BlacklistManagement removedSellers={removedSellers} />}
      </Box>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Log Out
            </AlertDialogHeader>
            <AlertDialogBody>
              Are you sure? You are about to be logged out.
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme="red" onClick={handleLogout} ml={3}>
                Logout
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Box>
  );
};

export default AdminDashboard;
