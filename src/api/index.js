import Vue from 'vue';

export const getDefaultAlbums = () => Vue.axios.get('album');
export const getDefaultAlbum = id => Vue.axios.get(`album/${id}`);

export const renameDefaultAlbum = (id, name) => Vue.axios.patch(`album/${id}`, { title: name });

export const getProtectedImage = src => Vue.axios.get(src, { responseType: 'arraybuffer' });
