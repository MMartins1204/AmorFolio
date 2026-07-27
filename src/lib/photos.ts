export interface Photo {
  id: string;
  url: string;
  thumbnailUrl: string;
  title: string;
  width: number;
  height: number;
}

export function groupPhotosByDate(photos: Photo[]): Map<string, Photo[]> {
  const groups = new Map<string, Photo[]>();
  for (const photo of photos) {
    if (!groups.has('all')) {
      groups.set('all', []);
    }
    groups.get('all')!.push(photo);
  }
  return groups;
}

const GP = 'https://lh3.googleusercontent.com/pw/';

export const samplePhotos: Photo[] = [
  {
    id: 'gp-new1',
    url: `${GP}AP1GczN17TorL5OyhxvWcJg4fr4lCpUBQ5w6pBS1voeimYNMOj7uLS0aHzi1ZuEgd2fpVccZroFtHc8K76Q8liWAVAo-xnPYze8wy9F2UA8stHJUL-9WkBcw=w1200`,
    thumbnailUrl: `${GP}AP1GczN17TorL5OyhxvWcJg4fr4lCpUBQ5w6pBS1voeimYNMOj7uLS0aHzi1ZuEgd2fpVccZroFtHc8K76Q8liWAVAo-xnPYze8wy9F2UA8stHJUL-9WkBcw=w600`,
    title: 'Nossas fotos',
    width: 4080,
    height: 3060,
  },
  {
    id: 'gp-1',
    url: `${GP}AP1GczOLwGuIP5iEwpmmxkXXRWsBQpXH50QkbOeCRi4DDwC8hAkJlOyvxmleFN1Ot4aKc_anPCooZ7EeBDvu3XSPDxjEV846PLeiP_C6_l15_Q4J55F5CfYm=w1200`,
    thumbnailUrl: `${GP}AP1GczOLwGuIP5iEwpmmxkXXRWsBQpXH50QkbOeCRi4DDwC8hAkJlOyvxmleFN1Ot4aKc_anPCooZ7EeBDvu3XSPDxjEV846PLeiP_C6_l15_Q4J55F5CfYm=w600`,
    title: 'Nossas fotos',
    width: 4080,
    height: 2296,
  },
  {
    id: 'gp-2',
    url: `${GP}AP1GczOS0jbCutul0ZlEG4d9-IV_caGQVp4XKL5hnpABp3vhmG6z02O5biHLoGXamPxiotnWAL-tNvgFkSEhGdixkFgMusBxtKiGQZJ9rAwKI3KgIdnddj3x=w1200`,
    thumbnailUrl: `${GP}AP1GczOS0jbCutul0ZlEG4d9-IV_caGQVp4XKL5hnpABp3vhmG6z02O5biHLoGXamPxiotnWAL-tNvgFkSEhGdixkFgMusBxtKiGQZJ9rAwKI3KgIdnddj3x=w600`,
    title: 'Nossas fotos',
    width: 2556,
    height: 3408,
  },
  {
    id: 'gp-3',
    url: `${GP}AP1GczMxsZoeZgCqFiGQp0kYnJ__X47-9nX74AiYwmJogdzl7V8WOPO7Y5fb9oSl3HPig5O5q1dqNsLDt4de8AuS96xx3R-PpXSWtYBU6QncfbwukCb2p1oW=w1200`,
    thumbnailUrl: `${GP}AP1GczMxsZoeZgCqFiGQp0kYnJ__X47-9nX74AiYwmJogdzl7V8WOPO7Y5fb9oSl3HPig5O5q1dqNsLDt4de8AuS96xx3R-PpXSWtYBU6QncfbwukCb2p1oW=w600`,
    title: 'Nossas fotos',
    width: 3060,
    height: 4080,
  },
  {
    id: 'gp-4',
    url: `${GP}AP1GczPR_UBfX1eL6JWLnCANSUs3YxqOLjom8G5KQdk4O0KaDM7DxFUs6vXPnUQ95aWKRdCQvVriLga9j_8eELl8ZeQgA1ZJvvOXbxl-FCHpNWyFJzPMSbVl=w1200`,
    thumbnailUrl: `${GP}AP1GczPR_UBfX1eL6JWLnCANSUs3YxqOLjom8G5KQdk4O0KaDM7DxFUs6vXPnUQ95aWKRdCQvVriLga9j_8eELl8ZeQgA1ZJvvOXbxl-FCHpNWyFJzPMSbVl=w600`,
    title: 'Nossas fotos',
    width: 3060,
    height: 4080,
  },
  {
    id: 'gp-5',
    url: `${GP}AP1GczPhk1ze6kmKn6cFDEBzx3pQFkUYlMtHot-oP9V7d_utt5Ned1YXnwcsJ99B1ATc1hYZgp6Tmz-6X_ZtH0ORnZf4t8C7aibw5NWpTZq4OumawWTf6CJ1=w1200`,
    thumbnailUrl: `${GP}AP1GczPhk1ze6kmKn6cFDEBzx3pQFkUYlMtHot-oP9V7d_utt5Ned1YXnwcsJ99B1ATc1hYZgp6Tmz-6X_ZtH0ORnZf4t8C7aibw5NWpTZq4OumawWTf6CJ1=w600`,
    title: 'Nossas fotos',
    width: 3060,
    height: 4080,
  },
  {
    id: 'gp-6',
    url: `${GP}AP1GczOxaUikW-_tibqXsNoZmQ0RSB6DvC3Aa4De4Iorp_OP_c67JpDkpjPii23xfK5haCrRmX6rKjoWPj_vrZdSNG7e8A0sqjkNaZxdJJ-BlL8CCJM0E_tL=w1200`,
    thumbnailUrl: `${GP}AP1GczOxaUikW-_tibqXsNoZmQ0RSB6DvC3Aa4De4Iorp_OP_c67JpDkpjPii23xfK5haCrRmX6rKjoWPj_vrZdSNG7e8A0sqjkNaZxdJJ-BlL8CCJM0E_tL=w600`,
    title: 'Nossas fotos',
    width: 1080,
    height: 1464,
  },
];
