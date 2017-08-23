import Vue from 'vue';
import LOCAL_API_URL from '@/env';

const BASE_URL = (Vue.config.env === 'production') ? 'https://api.prisma.care/v1' : LOCAL_API_URL;

export const login = (email, password) => Vue.axios.post(`${BASE_URL}/user/signin`, { email, password });

export const getAlbums = () => 'foo';
