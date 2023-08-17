import { Item } from "./item.model";
import { User } from "./user.model";

export interface Review {
  id?: number;
  rating?: number;
  comment?: Text;
  item?: Item;
  postedBy?: User;
  createdAt: Date | null;
  updatedAt: Date | null;
}

// le rating d'un film :
// on veut afficher la liste de tous les movies et les books postés par un user et ses amis.
// Tous ces livres et films possèdent une note sur 5 (des étoiles) qui correspond à la moyenne des notes données par son réseau d'amis.
// chaque personne qui poste un livre ou un film donne un review avec un comment et une rating.
// chaque personne amie avec la personne qui a posté un livre ou un film peut aussi mettre un comment et un rating sur le livre ou le film.
// Comment calculer cette note?
// dans le front ou dans le back?


// SELECT AVG(r.rating) AS average_rating
// FROM review r
// JOIN friendship f ON r.posted_by = f.friendship_requester_user_id OR r.posted_by = f.friendship_accepter_user_id
// WHERE f.friendship_requester_user_id = <user_id> OR f.friendship_accepter_user_id = <user_id>
//   AND r.item_id = <item_id>;