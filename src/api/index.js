import Vue from 'vue';

export const getDefaultAlbums = () => Vue.axios.get('album');
export const getDefaultAlbum = id => Vue.axios.get(`album/${id}`);
export const addDefaultAlbum = title => Vue.axios.post('album', { title });
export const renameDefaultAlbum = (id, name) => Vue.axios.patch(`album/${id}`, { title: name });
export const deleteDefaultAlbum = id => Vue.axios.delete(`album/${id}`);

export const getProtectedImage = src => Vue.axios.get(src, { responseType: 'arraybuffer' });
