export declare class SavePermissionDto {
    roleId: string;
    permissions: Array<{
        collectionName: string;
        insertUpdate: boolean;
        delete: boolean;
        view: boolean;
        export: boolean;
    }>;
}
