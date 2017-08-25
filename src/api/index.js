import Vue from 'vue';

export const getDefaultAlbums = () => Vue.axios.get('album');
export const getDefaultAlbum = id => Vue.axios.get(`album/${id}`);
export const addDefaultAlbum = title => Vue.axios.post('album', { title });
export const renameDefaultAlbum = (id, name) => Vue.axios.patch(`album/${id}`, { title: name });
export const deleteDefaultAlbum = id => Vue.axios.delete(`album/${id}`);

export const addStory = (albumId, description) => (
  Vue.axios.post(`album/${albumId}/heritage`, { description })
);
export const addAssetToStory = (albumId, storyId, asset) => (
  Vue.axios.post(`album/${albumId}/heritage/${storyId}/asset`, asset, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
);
export const updateStoryDescription = (albumId, storyId, description) => (
  Vue.axios.patch(`album/${albumId}/heritage/${storyId}`, { description })
);

export const getProtectedImage = src => Vue.axios.get(src, { responseType: 'arraybuffer' });
