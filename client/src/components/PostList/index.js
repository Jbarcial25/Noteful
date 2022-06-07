import { Avatar, AvatarGroup, Box, FormControl, FormLabel, FormHelperText, Input, InputGroup, InputRightElement, InputRightAddon, IconButton, Text, Tag, TagLabel, Divider } from '@chakra-ui/react';
import { FaSun, FaMoon, FaGithub, FaUser, FaPaperPlane, FaHeart, FaTrashAlt, FaUserAlien } from 'react-icons/fa';
import { useColorMode, useColorModeValue } from '@chakra-ui/color-mode';

import React from 'react';
import { Link as RouteLink } from 'react-router-dom';
    
const PostList = ({
    posts,
    title,
    showTitle = true,
    showUsername = true,
}) => {

    const { colorMode, toggleColorMode } = useColorMode();
    const isDark = colorMode === 'dark';
    const textcolor = useColorModeValue('yellow.900', '#E8DFD8');
    const bgcolor = useColorModeValue('RGBA(0, 0, 0, 0.16)', 'RGBA(0, 0, 0, 0.36)');

    if (!posts.length) {
        return <h3>No posts yet!</h3>;
    }

    return (

        <Box m={10}>

            {posts &&
                posts.map((post) => (
                    <FormControl key={post._id} isReadOnly id='comment' p={3} >

                        {/* renders the username */}
                            {showUsername ? (
                                <>
                                    {/* this is the post author */}
                                    <FormLabel color={textcolor}>
                                        <AvatarGroup>
                                            <Avatar 
                                                bg='#1D454E'
                                                boxSize={7}
                                            >
                                            </Avatar>
                                            <Text pl={5} className='indieFlower'>
                                                {post.postAuthor}
                                            </Text>
                                            <Text ml='auto'>
                                                {post.createdAt}
                                            </Text>
                                        </AvatarGroup>
                                        
                                            

                                    </FormLabel>
                                    
                                    {/* this links to the actual post page */}
                                    <RouteLink to={`/post/${post._id}`}>
                                        
                                        <InputGroup
                                            size='md'
                                            boxShadow='lg'
                                        >
                                            
                                            <Input h='65px' backgroundColor={bgcolor}
                                                variant='filled'
                                                type='comment'
                                                // posts text
                                                placeholder={post.postText}
                                            />
                                            <InputRightElement mr={5} p='33px'>
                                                <IconButton
                                                    icon={<FaHeart />} 
                                                    backgroundColor={isDark ? '#ECE8DF' : '#BFAE98'}
                                                    color={textcolor} />
                                                <IconButton 
                                                    icon={<FaTrashAlt />} 
                                                    backgroundColor={isDark ? '#ECE8DF' : '#BFAE98'}
                                                    color={textcolor} />
                                            </InputRightElement>
                                        </InputGroup>
                                    </RouteLink>

                                    <Divider></Divider>
                                </>

                                ) : (
                                    <>
                                        <Box m={3}>
                                            You have no posts yet
                                        </Box>
                                    </>
                                )}
                                
                                
                    </FormControl>

                ))}

        </Box>

    );
};

export default PostList;