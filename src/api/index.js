import Vue from 'vue';

export const getDefaultAlbums = () => Vue.axios.get('album');
export const getDefaultAlbum = id => Vue.axios.get(`album/${id}`);

export const updateDefaultAlbum = () => 'foo';

export const getProtectedImage = src => Vue.axios.get(src, { responseType: 'arraybuffer' });
