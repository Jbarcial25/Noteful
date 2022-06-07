import Authspage from './auths/Authspage';
import { Flex, Stack, HStack, Heading, Grid, GridItem, Spacer } from '@chakra-ui/layout';
import { IconButton, Link, Box, Button, Center, Divider, ButtonGroup, Container, Image, InputGroup, FormControl, FormLabel, Input, Text, InputRightElement, Wrap, WrapItem } from '@chakra-ui/react';
import { useColorMode, useColorModeValue } from '@chakra-ui/color-mode';
import { Link as RouteLink } from 'react-router-dom';

import { FaSun, FaMoon, FaGithub, FaPaperPlane, FaHeart, FaTrashAlt } from 'react-icons/fa';

// swiper elements
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Autoplay, Navigation, Pagination, Controller, Thumbs, EffectFade } from 'swiper';
import 'swiper/css';

import { useQuery } from '@apollo/client';
import { QUERY_USER, QUERY_POSTS, QUERY_SINGLE_POST, QUERY_ME } from '../utils/queries';
import Auth from '../utils/auth';
import PostList from '../components/PostList';






export default function Homepage({ loggedIn, setLoggedIn }) {

    const { colorMode, toggleColorMode } = useColorMode();
    const isDark = colorMode === 'dark';
    const textcolor = useColorModeValue('#BFAE98', '#E8DFD8');
    const bgcolor = useColorModeValue('RGBA(0, 0, 0, 0.16)', 'RGBA(0, 0, 0, 0.36)');

    const outerBoxStyles = {
        background:
            'url(../img/background.png) center/cover no-repeat',
    }

    const logout = (event) => {
        event.preventDefault();
        Auth.logout();
    };

    const { loading, data } = useQuery(QUERY_POSTS)
    const posts = data?.posts || []

    return (
        <Stack p={5} sx={outerBoxStyles} >
            <Flex w='100%'>
                <Spacer></Spacer>
                <Link href='https://github.com/a-vitug/react-app'>
                    <IconButton ml={2} icon={<FaGithub />} backgroundColor={bgcolor} isRound='true'></IconButton>
                </Link>

                <IconButton ml={8} icon={isDark ? <FaSun /> : <FaMoon />} backgroundColor={bgcolor} isRound='true' onClick={toggleColorMode}></IconButton>
            </Flex>

            {/* if logged in */}
            {Auth.loggedIn() ? (
                <Box mx={100} backdropFilter='auto' backdropBlur='3px' borderRadius='md' >
                    <Flex w='90%'>
                        <Spacer></Spacer>
                        <Button ml={2}
                            color='#BDD1B6'
                            border='2px'
                            borderRadius='md'
                            boxShadow='lg'
                            type='button'
                        >
                            <RouteLink to='/profile'> My Account </RouteLink>
                        </Button>
                        <Button onClick={logout}
                            // onClick={() => setLoggedIn(!loggedIn)}
                            ml={8}
                            color='#BDD1B6'
                            border='2px'
                            borderRadius='md'
                            boxShadow='lg'
                            type='button'
                        >
                            Log out
                        </Button>
                    </Flex>
                    <Box m='30px'>
                        <Text
                            textShadow={isDark ? '2px 2px #BFAE98' : '2px 2px #E8DFD8'}
                            className='gloria'
                            p='30px'
                            pl='100px'
                            fontSize='6xl'
                            color={textcolor}
                        >
                            What's on your mind?
                        </Text>
                        <Center>
                            <Box p='30px' w='80%'>
                                <FormControl id='post'>
                                    <InputGroup
                                        size='lg'
                                        boxShadow='lg'
                                    >
                                        <Input h='100px'
                                            backgroundColor='RGBA(0, 0, 0, 0.16)'
                                            variant='filled'
                                            type='post'
                                            placeholder='Type something here... '
                                        // onChange={(e) => setEmail(e.target.value)}
                                        />
                                        <InputRightElement mr={5} p='50px'>
                                            <IconButton icon={<FaPaperPlane />}
                                                size='lg'
                                                backgroundColor={isDark ? '#ECE8DF' : '#BFAE98'}
                                                color={isDark ? '#5E4D3B' : '#E8DFD8'} />
                                        </InputRightElement>
                                    </InputGroup>
                                </FormControl>
                            </Box>
                        </Center>
                    </Box>

                    <Divider />

                    <Grid templateColumns='repeat(5, 1fr)' gap={5}>
                        {/* paid ads */}
                        <Box m={3}>
                            <Link href='https://buy.stripe.com/test_aEU7sD5at8bBali004'>
                                <Image src={isDark ? './images/dark4.png' : './images/adss4.png'} />
                            </Link>
                        </Box>
                        <GridItem colSpan={3}>
                            <Text
                                className='indie'
                                fontWeight='bold'
                                p='20px'
                                fontSize='3xl'
                                color={textcolor}
                            >
                                Here's some news for you...
                            </Text>

                            {/*POSTS LIST */}
                            <Box m={3}>
                                <FormControl isReadOnly id='comment' >
                                    {loading ? (
                                        <div> loading....</div>
                                    ) : (
                                        <PostList
                                            posts={posts}
                                            title='here are some posts'
                                        />
                                    )}
                                </FormControl>
                            </Box>
                        </GridItem>

                        {/* paid ads */}
                        <GridItem colEnd={6}>
                            <Box m={5}>
                                <Link href='https://buy.stripe.com/test_eVaaEP7iBajJ9he8wx'>
                                    <Image src={isDark ? './images/dark3.png' : './images/adsss3.png'} />
                                </Link>

                            </Box>
                        </GridItem>

                    </Grid>
                </Box>

                // else logged out
            ) : (
                <Box>
                    <Flex>
                        <Spacer></Spacer>
                        <RouteLink to='/authspage'>
                            <Button m={5} backgroundColor={bgcolor}
                            // onClick={() => setLoggedIn(!loggedIn)}
                            >
                                Log in
                            </Button>
                        </RouteLink>
                    </Flex>


                    <Grid mx={100} templateColumns='repeat(4, 1fr)' gap={1}>
                        <GridItem colSpan={2}>
                            <Swiper modules={[Autoplay, Navigation, Pagination, EffectFade]}
                                autoplay={{ disableOnInteraction: false }}
                                navigation={true}
                                pagination={{ clickable: true }}
                                loop
                                effect={'fade'}
                                speed={800}
                                slidesPerView={2}
                                id='first'

                            >
                                <SwiperSlide>
                                    <Image w='100%' h='100%' objectFit='cover' src='./images/4.png' />
                                </SwiperSlide>
                                <SwiperSlide>
                                    <Image w='100%' h='100%' objectFit='cover' src='./images/2.png' />
                                </SwiperSlide>
                                <SwiperSlide>
                                    <Image w='100%' h='100%' objectFit='cover' src='./images/6.png' />
                                </SwiperSlide>


                            </Swiper>
                        </GridItem>

                        <GridItem colStart={3} colEnd={6}>
                            <Swiper modules={[Autoplay, Navigation, Pagination, EffectFade]}
                                autoplay={{ disableOnInteraction: false }}
                                navigation={true}
                                pagination={{ clickable: true }}
                                loop
                                effect={'fade'}
                                speed={800}
                                slidesPerView={1}
                                id='second'
                            >
                                <SwiperSlide>
                                    <Image w='100%' h='100%' objectFit='cover' src='./images/5.png' />
                                </SwiperSlide>
                                <SwiperSlide>
                                    <Image w='100%' h='100%' objectFit='cover' src='./images/3.png' />
                                </SwiperSlide>
                                <SwiperSlide>
                                    <Image w='100%' h='100%' objectFit='cover' src='./images/7.png' />
                                </SwiperSlide>
                            </Swiper>
                        </GridItem>


                    </Grid>

                    <Box backdropFilter='auto' backdropBlur='3px' borderRadius='md'>

                        <Divider />

                        <Grid templateColumns='repeat(5, 1fr)' gap={5}>

                            {/* paid ads */}
                            <Box m={5}>
                                <Link href='https://buy.stripe.com/test_6oE5kveL363t796cMO'>
                                    <Image src={isDark ? './images/dark1.png' : './images/ad1.png'} />
                                </Link>
                            </Box>
                            <GridItem colSpan={3}>
                                <Text
                                    className='indie'
                                    fontWeight='bold'
                                    p='20px'
                                    fontSize='3xl'
                                    color={textcolor}
                                >
                                    Check out some user's opinions
                                </Text>

                                {/* user's post 1 */}
                                <Box m={3}>
                                    <FormControl isReadOnly id='comment' >
                                        <FormLabel color={textcolor}> username1 </FormLabel>
                                        <InputGroup
                                            size='md'
                                            boxShadow='lg'
                                        >
                                            <Input h='65px' backgroundColor={bgcolor}
                                                variant='filled'
                                                type='comment'
                                                placeholder='wow this is a great app! '
                                            />
                                        </InputGroup>
                                    </FormControl>
                                </Box>



                            </GridItem>
                            {/* paid ads */}
                            <GridItem colEnd={6}>
                                <Box m={3}>
                                    <Link href='https://buy.stripe.com/test_bIY7sDbyR4Zp652003'>
                                        <Image src={isDark ? './images/dark2.png' : './images/ads2.png'} />
                                    </Link>
                                </Box>
                            </GridItem>

                        </Grid>
                    </Box>

                </Box>

            )}



        </Stack>
    );
}
