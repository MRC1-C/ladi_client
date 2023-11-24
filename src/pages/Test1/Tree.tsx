import { useState } from 'react';
import { Tree, Button } from 'antd';
import routes from '../../routes/privateRouter'

const { TreeNode } = Tree;

const PermissionManagement = () => {
    const [expandedKeys, setExpandedKeys] = useState([]);
    const [checkedKeys, setCheckedKeys] = useState([]);

    const generateTreeNodes = (routes: any, parentPath = '') => {
        return routes.map((route: any) => {
            const currentPath = parentPath ? `${parentPath}/${route.path}` : route.path;

            if (route.routes) {
                return (
                    <TreeNode key={currentPath} title={route.name}>
                        {generateTreeNodes(route.routes, currentPath)}
                    </TreeNode>
                );
            }

            return route.name && (
                <TreeNode key={currentPath} title={route.name}>
                    <TreeNode key={`${currentPath}*Create`} title="Create" />
                    <TreeNode key={`${currentPath}*Read`} title="Read" />
                    <TreeNode key={`${currentPath}*Update`} title="Update" />
                    <TreeNode key={`${currentPath}*Delete`} title="Delete" />
                </TreeNode>
            );
        });
    };

    const onExpand = (expandedKeysValue: any) => {
        setExpandedKeys(expandedKeysValue);
    };

    const onCheck = (checkedKeysValue: any) => {
        setCheckedKeys(checkedKeysValue);
    };

    const handleSavePermissions = () => {
        const createTreeFromPaths = (paths: any) => {
            const tree = {};
            paths.forEach((path: any) => {
                const pathParts = path.path.split('/');
                let currentNode = tree as any;
                pathParts.forEach((part: any, index: any) => {
                    currentNode[part] = currentNode[part] || {};
                    currentNode = currentNode[part];
                    if (index === pathParts.length - 1) {
                        currentNode.permissions = path.permissions
                    }
                });
            });
            return tree;
        };

        const mapTreeToRoutes = (tree: any, routes: any) => {
            return Object.keys(tree).map((key) => {
                const route = routes.find((r: any) => r.path === key);
                if (route) {
                    if (route?.routes) {
                        route.routes = mapTreeToRoutes(tree[key], route.routes);
                    }
                    else {
                        route.canAccess = tree[key].permissions
                        return route
                    }
                }
                return route;
            }).filter(Boolean);
        };

        const r = checkedKeys.filter((key:any) => key.includes('*')).reduce((result:any, key:any) => {
            const [path, permission] = key.split('*');
            if (!result[path]) {
                result[path] = {
                    path,
                    permissions: [],
                };
            }
            if (permission) {
                result[path].permissions.push(permission);
            }
            return result;
        }, {});
        const tree = createTreeFromPaths(Object.values(r));
        console.log(tree)
        // const mappedRoutes = mapTreeToRoutes(tree, routes.route.routes);
        console.log(checkedKeys.filter((key:any) => key.includes('*')))

    };

    return (
        <div>
            <h2>Permission Management</h2>
            <Tree
                checkable
                onExpand={onExpand}
                expandedKeys={expandedKeys}
                onCheck={onCheck}
                checkedKeys={checkedKeys}
            >
                <TreeNode key={''} title="Quyền truy cập">
                    {generateTreeNodes(routes.route.routes)}
                </TreeNode>
            </Tree>
            <Button type="primary" onClick={handleSavePermissions}>
                Save Permissions
            </Button>
        </div>
    );
};

export default PermissionManagement;
