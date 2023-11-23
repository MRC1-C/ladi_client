import React, { useState } from 'react';
import { Tree, Button } from 'antd';
import routes from '../../routes/privateRouter'

const { TreeNode } = Tree;

const PermissionManagement = () => {
    const [expandedKeys, setExpandedKeys] = useState([]);
    const [checkedKeys, setCheckedKeys] = useState([]);

    const generateTreeNodes = (routes, parentPath = '') => {
        return routes.map((route) => {
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

    const onExpand = (expandedKeysValue) => {
        setExpandedKeys(expandedKeysValue);
    };

    const onCheck = (checkedKeysValue) => {
        setCheckedKeys(checkedKeysValue);
    };

    const handleSavePermissions = () => {
        const createTreeFromPaths = (paths) => {
            const tree = {};
            paths.forEach((path) => {
                const pathParts = path.path.split('/');
                let currentNode = tree;
                pathParts.forEach((part, index) => {
                    currentNode[part] = currentNode[part] || {};
                    currentNode = currentNode[part];
                    if (index === pathParts.length - 1) {
                        currentNode.permissions = path.permissions
                    }
                });
            });
            return tree;
        };

        const mapTreeToRoutes = (tree, routes) => {
            return Object.keys(tree).map((key) => {
                const route = routes.find((r) => r.path === key);
                if (route) {
                    if(route?.routes){
                        route.routes = mapTreeToRoutes(tree[key], route.routes);
                    }
                    else{
                        route.canAccess = tree[key].permissions
                        return route
                    }
                }
                return route;
            }).filter(Boolean);
        };

        const r = checkedKeys.filter((key) => key.includes('*')).reduce((result, key) => {
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
        const mappedRoutes = mapTreeToRoutes(tree, routes.route.routes);
        console.log(checkedKeys.filter((key) => key.includes('*')))
          
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
