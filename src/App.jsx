import { useEffect, useRef, useState } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Image,
  Stack,
  Text,
  Input,
  Select,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
} from "@chakra-ui/react";

function App() {
  const [page, setPage] = useState(1);
  const [order, setOrder] = useState("market_cap_desc");
  const [currency, setCurrency] = useState("INR");
  const [coins, setCoins] = useState([]);
  const current_coin = useRef(0);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&per_page=10&page=${page}&order=${order}`;

  useEffect(() => {
    async function fetchdata() {
      try {
        let res = await fetch(url);
        res = await res.json();
        setCoins(res);
      } catch (error) {
        console.log(error);
      }
    }
    fetchdata();
  }, [url]);

  return (
    <>
      <Stack direction="row" spacing="24px" justify>
        <Input placeholder="Search" />
        <Select
          placeholder="Select Currency"
          onChange={(e) => {
            setCurrency(e.target.value);
          }}
        >
          <option value="INR">INR</option>
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
        </Select>
        <Select
          placeholder="Sort"
          onChange={(e) => {
            setOrder(e.target.value);
          }}
        >
          <option value="market_cap_asc">Acsending</option>
          <option value="market_cap_desc">Descending</option>
        </Select>
      </Stack>
      <TableContainer>
        <Table variant="simple">
          <Thead height="80px">
            <Tr backgroundColor="yellow">
              <Th fontSize="3xl">Coin</Th>
              <Th fontSize="3xl">Price</Th>
              <Th fontSize="3xl">24h Change</Th>
              <Th fontSize="3xl">Market Cap</Th>
            </Tr>
          </Thead>
          <Tbody>
            {coins.length > 0 &&
              coins.map((coin, index) => {
                return (
                  <Tr
                    key={coin.id}
                    backgroundColor="black"
                    color="white"
                    onClick={() => {
                      current_coin.current = index;
                      onOpen();
                    }}
                  >
                    <Td>
                      <Stack direction="row" spacing="24px">
                        <Image
                          borderRadius="full"
                          boxSize="80px"
                          objectFit="cover"
                          src={coin.image}
                          alt="Dan Abramov"
                        />
                        <Stack direction="column" spacing="24px">
                          <Text fontSize="4xl">
                            {coin.symbol.toUpperCase()}
                          </Text>
                          <Text fontSize="2xl">{coin.name}</Text>
                        </Stack>
                      </Stack>
                    </Td>
                    <Td>
                      <Text fontSize="2xl">{coin.current_price}</Text>
                    </Td>
                    <Td>
                      {coin.price_change_percentage_24h.toFixed(2) > 0 ? (
                        <Text fontSize="2xl" color="green">
                          {`+${coin.price_change_percentage_24h.toFixed(2)}`}
                        </Text>
                      ) : (
                        <Text fontSize="2xl" color="red">
                          {coin.price_change_percentage_24h.toFixed(2)}
                        </Text>
                      )}
                    </Td>
                    <Td>
                      <Text fontSize="2xl">{coin.market_cap}</Text>
                    </Td>
                  </Tr>
                );
              })}
          </Tbody>
        </Table>
      </TableContainer>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {coins.length > 0 && coins[current_coin.current].name}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {coins.length > 0 && (
              <Stack>
                <Text>
                  Market Cap Rank {coins[current_coin.current].market_cap_rank}
                </Text>
                <Image
                  boxSize="80px"
                  objectFit="cover"
                  src={coins[current_coin.current].image}
                  alt="Dan Abramov"
                />
                <Text>{coins[current_coin.current].symbol.toUpperCase()}</Text>
                <Text>
                  Current Price : {coins[current_coin.current].current_price}
                </Text>
                <Text>
                  Price Change 24 Hour :
                  {coins[current_coin.current].price_change_24h}
                </Text>
                <Text>
                  Total Volume : {coins[current_coin.current].total_volume}
                </Text>
                <Text>Low 24 Hour : {coins[current_coin.current].low_24h}</Text>
                <Text>
                  High 24 Hour : {coins[current_coin.current].high_24h}
                </Text>
                <Text>
                  Total Supply : {coins[current_coin.current].total_supply}
                </Text>
                <Text>
                  Max Supply : {coins[current_coin.current].max_supply}
                </Text>
                <Text>
                  Circulating Supply :{" "}
                  {coins[current_coin.current].circulating_supply}
                </Text>
                <Text>All Time High : {coins[current_coin.current].ath}</Text>
                <Text>
                  Last Updated Date : {coins[current_coin.current].last_updated}
                </Text>
              </Stack>
            )}
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Stack direction="row" height="80px" alignItems="center" justify="center">
        <Button
          height="80%"
          width="100px"
          colorScheme="telegram"
          onClick={() => {
            if (page > 1) {
              setPage(page - 1);
            }
          }}
        >
          Prev
        </Button>
        <Button
          height="80%"
          width="100px"
          colorScheme="telegram"
          onClick={() => {
            setPage(page + 1);
          }}
        >
          Next
        </Button>
      </Stack>
    </>
  );
}

export default App;
// - Image
// - Name
// - Symbol
// - Current Price
// - Price Change 24 Hour
// - Total Volume
// - Low 24 hour
// - High 24 Hour
// - Total Supply
// - Max Supply
// - Circulating Supply
// - All Time High (ath)
// - Last Updated Date
