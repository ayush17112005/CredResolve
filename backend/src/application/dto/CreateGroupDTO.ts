export interface CreateGroupDTO {
  name: string;
  description?: string;
  createdBy: string; // User ID
}

export interface GroupResponseDTO {
  id: string;
  name: string;
  description?: string;
  createdBy: string;
  createdAt: Date;
}

export interface AddMemberDTO {
  groupId: string;
  userId:  string;
}