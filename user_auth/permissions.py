from rest_framework import permissions


class AllowPostAnyReadAuthenticatedUser(permissions.BasePermission):

    def has_permission(self, request, view):
        # Allow anyone to register
        if request.method == "POST":
            return True
        # Must be authenticated to view
        else:
            return request.user

    def has_object_permission(self, request, view, obj):
        # Any view method requires you to be the user
        return obj.id == request.user.id or request.user.is_admin


class IsOwnerOrReadOnly(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True

        return obj.owner == request.user
